import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';


const CheckOutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { price, patientName, email, _id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-tawny-xi.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log(error)
            setCardError(error.message)
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {

            // store payment info in the database
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch('https://doctors-portal-server-tawny-xi.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congratulation! Your payment completed.');
                        setTransactionId(paymentIntent.id);
                    }
                })
        }
        setProcessing(false);
        console.log('paymentIntent', paymentIntent)
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    cardError && <p className='text-sm text-red-500'>{cardError}</p>
                }
                <button className='btn btn-sm btn-secondary mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                success && <div className='py-5 space-y-2'>
                    <p className='text-green-500 font-bold'>{success}</p>
                    <p>Your TransactionId: <span className='font-semibold'>{transactionId}</span> </p>
                </div>
            }
        </>

    );
};

export default CheckOutForm;