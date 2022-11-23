import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PPP')

    const { data: availableAppointments = [], refetch, isLoading } = useQuery({
        queryKey: ['availableAppointments', date],
        // queryFn: () => fetch('https://doctors-portal-server-tawny-xi.vercel.app/appointmentOptions')
        //     .then(res => res.json())

        // alternative function
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-tawny-xi.vercel.app/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }

    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='mt-10 '>
            <p className='text-center text-lg text-secondary'>Available Appointments on {format(selectedDate, 'PPP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5'>
                {
                    availableAppointments.map(option => <AppointmentOption key={option._id} option={option} setTreatment={setTreatment}></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal treatment={treatment} selectedDate={selectedDate} setTreatment={setTreatment} refetch={refetch}>

                </BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;