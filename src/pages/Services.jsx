import React, { useState } from 'react';
import ServicesHome from "../components/ServicesHome";
import "./Services.css";
import ServiceForm from '../components/serviceForm';
import Modal from '../components/ServiceFormModal';

import "aos/dist/aos.css";
import Aos from "aos";

import { Helmet } from 'react-helmet';

import { useEffect } from 'react';

const services = [
    {
        title: 'Exclusive Marketing',
        header: 'Exclusive Selling of Brand New Apartments, Villas & Plots of Land Owners, Investors and Developers',
        description: "Assets Global specializes in the exclusive marketing of brand new apartments, villas, and land, providing strategic investment opportunities. Our comprehensive real estate services cater to diverse needs, including property selection, investment advisory, and full transaction support. We ensure seamless experiences with a focus on optimal returns and client satisfaction."
    },
    {
        title: 'Leasing',
        header: 'Property Leasing – Residential & Commercial',
        description: 'In the realm of property leasing, Assets Global excels in both residential and commercial sectors. We specialize in securing optimal rental agreements for apartment owners and tenants, leveraging extensive industry connections. Our expertise extends to commercial property sales and leasing, catering to diverse needs with professionalism and market insight.'
    },
    {
        title: 'Resale',
        header: 'Resale (Secondary Market) – Residential & Commercial',
        description: "In the resale (secondary market) segment, Assets Global's dedicated team assists homeowners in selling their residential and commercial properties by connecting them with prospective buyers. Our service is sought after by homeowners with multiple residential investments and by new buyers seeking quality resale apartments."
    }
];

const Services = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 1000 }); // Remove `once: true` for continuous animations
        console.log('aos')
    }, []);

    const handleEnquireClick = (type) => {
        setServiceType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleItemDetailsClick = () => {
        setExpanded(!expanded);
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        < main className='main-service-container'>
            <Helmet>
                <title>Collaborate with Excellence: Partner with AssetsGlobal</title>
                <meta name="description" content="Elevate your business success by partnering with AssetsGlobal. 
                Collaborate with excellence, unlock innovative solutions, 
                and thrive together in a world of possibilities."/>
                <meta name="keywords" content="Real estate collection" />
            </Helmet>
            <div>
                <div data-aos="fade-up">
                    <h1>Services</h1>
                    <div className="services_container">
                        <div>
                            <h2>Buy a Property</h2>
                            <p>We will help you to buy an Apartment, Villa or Plot.</p>
                            <button className="enq_btn" onClick={() => handleEnquireClick('BUY_A_PROPERTY')}>Enquire Now</button>
                        </div>
                        <div >
                            <h2>Sell a Property</h2>
                            <p>We will help and assist you to sell your Apartment, Villa or Plot.</p>
                            <button className="enq_btn" onClick={() => handleEnquireClick('SELL_A_PROPERTY')}>Enquire Now</button>
                        </div>
                        <div>
                            <h2>Rent a Property</h2>
                            <p>We will help you find a suitable Tenant.</p>
                            <button className="enq_btn" onClick={() => handleEnquireClick('RENT_A_PROPERTY')}>Enquire Now</button>
                        </div>
                    </div>
                </div>
                <div className='what-we-do-container' data-aos="fade-up">
                    <h1>What We Do</h1>
                    <div className="we_do_container">
                        <div className="buttons_row">
                            {services.map((service, index) => (
                                <button
                                    key={index}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={activeIndex === index ? 'active' : 'non-active'}
                                >
                                    {service.title}
                                </button>
                            ))}
                        </div>
                        <div className="item_details">
                            <h5>{services[activeIndex].header}</h5>
                            <p className={expanded ? 'expanded' : 'expanded-view'}>{services[activeIndex].description}</p>
                            <div className='service-read-more-div'>

                            <button className="read-more-btn" onClick={toggleExpanded}>
                                {expanded ? 'Read Less' : 'Read More'}
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up">
                    <h1>Why Choose Us</h1>
                    <ServicesHome />
                </div>
            </div>
            <Modal show={showModal} onClose={closeModal}>
                <ServiceForm serviceType={serviceType} />
            </Modal>
        </ main>
    );
};

export default Services;
