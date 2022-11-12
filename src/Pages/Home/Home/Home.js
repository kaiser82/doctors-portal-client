import React from 'react';
import Banner from '../Banner/Banner';
import BannerBot from '../BannerBot/BannerBot';
import ContactUs from '../ContactUs/ContactUs';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <h2>This is Home page</h2>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <BannerBot></BannerBot>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;