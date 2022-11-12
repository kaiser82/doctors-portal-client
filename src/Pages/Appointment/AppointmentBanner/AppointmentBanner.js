import React from 'react';
import chair from '../../../assets/images/chair.png'

const AppointmentBanner = () => {
    return (
        <header>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className=" rounded-lg shadow-2xl " alt='dentist chair' />
                    <div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;