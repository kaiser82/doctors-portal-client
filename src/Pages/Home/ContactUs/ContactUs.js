import React from 'react';
import bgImg from '../../../assets/images/appointment.png'

const ContactUs = () => {
    return (
        <section className='p-5' style={{ background: `url(${bgImg})` }}>
            <div className='text-center py-5'>
                <h5 className='text-xl text-secondary'>Contact Us</h5>
                <h3 className='text-3xl text-white font-semibold'>Stay Connected With Us</h3>
            </div>

            <form className='form-control lg:w-1/2 mx-auto space-y-4 py-5'>
                <input type="text" placeholder="Email address" className="input input-bordered w-full" />
                <input type="text" placeholder="Subject" className="input input-bordered w-full " />
                <textarea className="textarea textarea-bordered" placeholder="Your message"></textarea>
            </form>

        </section>
    );
};

export default ContactUs;