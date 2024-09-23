import React from 'react';
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { FaInstagram, FaPhone } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { PiFacebookLogoFill } from "react-icons/pi";
import './ContactPgContactCard.scss'

// const SocialIcons = [
//     { icon: PiFacebookLogoFill, url: 'https://www.facebook.com/assetsglobalofficial/' },
//     { icon: AiFillTwitterCircle, url: 'https://www.twitter.com' },
//     { icon: FaInstagram, url: 'https://www.instagram.com/assetsglobalofficial/' },
//     { icon: IoLogoLinkedin, url: 'https://www.linkedin.com/company/assets-global-official/' },
// ];
const ContactUsCards = () => {

    const contactCards = [
        {
            icon: FaWalking,
            name: 'Head Office -  Dubai ',
            desc: 'LHO - Bangalore, India',
        },
        {
            icon: FaPhone,
            name: 'Call Us',
            desc: <a href="tel:+91 77950 39691">+91 77950 39691</a>,
        },
        {
            icon: MdEmail,
            name: 'Email Us',
            desc: <a href="mailto:connect@assetsglobal.in">connect@assetsglobal.in</a>,
        },
    ];

    return (
        <div className='contactUsCard-container'>
            <h2>Reach Us - Assets Global</h2>
            <div className='contactUsCard' >
                {contactCards.map((card, index) => (
                    <div key={index} className="e-card playing">
                        <div className="image"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="infotop">
                            <card.icon className="card-icon" />
                            <p>{card.name}</p>
                            <h3 className="desc">{card.desc}</h3>
                            {/* {index === 2 && (
                                <div className="social-icons">
                                    {SocialIcons.map((social, idx) => (
                                        <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer">
                                            <social.icon className="social-icon" />
                                        </a>
                                    ))}
                                </div>
                            )} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactUsCards;
