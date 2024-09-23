import axios from 'axios';
import { useEffect, useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { PiFacebookLogoFill } from "react-icons/pi";
import { RiUser3Line } from "react-icons/ri";
import ContactUsCards from '../components/ContactPgContactCard';
import Popup from '../components/ContactPgPopup';
import "./Contact.scss";

import logo3 from '../Images/logo3.jpg'

import { Helmet } from 'react-helmet';

import "aos/dist/aos.css"
import Aos from "aos"



const Contact = () => {
    const initialFields = {
        name: '',
        email: '',
        message: '',
        mobileNumber: ''
    };
    const [data, setData] = useState(initialFields);
    const [error, setError] = useState(initialFields);
    const [submitted, setSubmitted] = useState(false);

    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const validateInput = (fieldname, value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;
        switch (fieldname) {
            case 'email':
                if (!emailPattern.test(value)) {
                    return 'Invalid email address';
                }
                break;
            case 'mobileNumber':
                if (!phonePattern.test(value)) {
                    return 'Invalid phone number';
                }
                break;
            case 'name':
                if (!value.trim()) {
                    return 'Name is required';
                }
                break;
            // case 'message':
            //     if (!value.trim()) {
            //         return 'Message is required';
            //     }
            //     break;
            default:
                break;
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        const errorMessage = validateInput(name, value);
        setError({ ...error, [name]: errorMessage });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const validationErrors = {};
        Object.keys(data).forEach(key => {
            const errorMessage = validateInput(key, data[key]);
            if (errorMessage) {
                validationErrors[key] = errorMessage;
            }
        });

        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8080/addLeads', data)
                .then(response => {
                    console.log('Message sent successfully', response.data);
                    const message = response.data.message;
                    setPopupMessage(message); // Set message for the popup
                    setShowPopup(true); // Show the popup
                    setData(initialFields);
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    setData(initialFields);
                });
        }
    };


    return (
        <div className='contact-pg-container' data-aos="fade-up">
            <Helmet>
                <title>Contact AssetsGlobal for Expert Property Advice</title>
                <meta name="description" content="Navigate the real estate landscape confidently with AssetsGlobal. Contact us for expert property advice, guiding you towards smart and informed investment decisions." />
                <meta name="keywords" content=" Real estate collection" />
            </Helmet>
            <div data-aos="fade-up"><ContactUsCards /></div>
            <div className="contact-main-container" data-aos="fade-up">
                <section className="image-logo" >
                    <img
                        src={logo3}
                        alt="Building Image"
                    />
                    <div className="image-text">
                        <h2>Assets Global</h2>
                        <p>
                            Over the years, we have successfully managed and facilitated transactions for over 1000 properties across various categories. Collaborating closely with 50 reputable developers, we ensure a diverse portfolio that meets the needs of our discerning clientele.
                        </p>
                        {/* <div className="image-icons">
                            <AiFillTwitterCircle />
                            <PiFacebookLogoFill />
                        </div> */}
                    </div>
                </section>

                <section className="contact-details">
                    <div className="headings">
                        <h1>Get In Touch</h1>
                        <p>24/7 Via mail any of your questions and problems</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="full-name">
                            <div className="input-group">
                                <div className="label-icon">
                                    <RiUser3Line className="icon" />
                                    <label htmlFor="name">Full Name</label>
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className={error.name ? 'invalid' : data.name ? 'valid' : 'no-border'}
                                />
                                {error.name && <span className="error">{error.name}</span>}
                            </div>
                        </div>

                        <div className="email">
                            <div className="input-group">
                                <div className="label-icon">
                                    <MdOutlineEmail className="icon" />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className={error.email ? 'invalid' : data.email ? 'valid' : 'no-border'}
                                />
                                {error.email && <span className="error">{error.email}</span>}
                            </div>
                        </div>

                        <div className="phone">
                            <div className="input-group">
                                <div className="label-icon">
                                    <IoIosPhonePortrait className="icon" />
                                    <label htmlFor="mobileNumber">Phone number</label>
                                </div>
                                <input
                                    type="number"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    value={data.mobileNumber}
                                    onChange={handleChange}
                                    className={error.mobileNumber ? 'invalid' : data.mobileNumber ? 'valid' : 'no-border'}
                                />
                                {error.mobileNumber && <span className="error">{error.mobileNumber}</span>}
                            </div>
                        </div>

                        <div className="description-text">
                            <div className="input-group">
                                <label htmlFor="message">Enquiry</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={data.message}
                                    onChange={handleChange}
                                    placeholder="Describe your text.."
                                    className={error.message ? 'invalid' : data.message ? 'valid' : 'no-border'}
                                />
                                {error.message && <span className="error">{error.message}</span>}
                            </div>
                        </div>
                        <button type="submit">Send message</button>
                    </form>
                </section>
                {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
            </div>
        </div>
    );
}

export default Contact;