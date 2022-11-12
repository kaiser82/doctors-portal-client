import React from 'react';
import doctorSmall from '../../../assets/images/doctor-small.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-40'
            style={{
                background: `url(${appointment})`
            }}
        >
            <div className="hero text-white">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctorSmall} className=" rounded-lg shadow-2xl hidden md:block lg:w-1/2 -mt-28" alt='' />
                    <div>
                        <h4 className='text-xl font-bold text-secondary'>Appointment</h4>
                        <h1 className="text-4xl lg:text-5xl font-bold">Make an appointment Today</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>get started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;