import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({ selectedDate }) => {
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const [treatment, setTreatment] = useState(null)
    console.log(availableAppointments)
    useEffect(() => {
        fetch('appointmentOptions.json')
            .then(res => res.json())
            .then(data => setAvailableAppointments(data))
    }, [])
    return (
        <section className='mt-10 '>
            <p className='text-center text-lg text-secondary'>Available Appointments on {format(selectedDate, 'PPP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5'>
                {
                    availableAppointments.map(option => <AppointmentOption key={option._id} option={option} setTreatment={setTreatment}></AppointmentOption>)
                }
            </div>
            {
                treatment && <BookingModal treatment={treatment} selectedDate={selectedDate} setTreatment={setTreatment}>

                </BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;