import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
    const booking = useLoaderData();
    // const navigation = useNavigation();
    const { treatmentName, price, appointmentDate, slot } = booking
    // if (navigation.state === 'loading') {
    //     return <Loading></Loading>
    // }
    return (
        <div>
            <h2 className='text-4xl'>Payment for {treatmentName}</h2>
            <p className='text-xl py-5'>Please Pay <strong>${price}</strong> for you appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;