import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { user } = useContext(AuthContext)
    const { name, slots, price } = treatment;
    const date = format(selectedDate, 'PPP');

    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value;
        const patientName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            slot,
            treatmentName: name,
            patientName,
            email,
            phone,
            price
        }

        fetch('https://doctors-portal-server-tawny-xi.vercel.app/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('appoint booked.')
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='space-y-5 mt-5'>
                        <input type="text" value={date} disabled className="input input-bordered w-full " />
                        <select name='slot' className="select select-bordered w-full ">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' defaultValue={user?.displayName} readOnly className="input input-bordered w-full " />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full " />
                        <input type="email" name='email' defaultValue={user?.email} readOnly className="input input-bordered w-full " />
                        <input type="submit" className='btn w-full' value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;