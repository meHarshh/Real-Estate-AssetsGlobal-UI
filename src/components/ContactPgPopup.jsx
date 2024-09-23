import React from 'react';
import { RiCheckboxCircleFill } from "react-icons/ri";
import './ContactPgPopup.scss'; // Import your custom styles for the popup

const Popup = ({ message, onClose }) => {
    return (
        <div className="contact-pg-popup">
            <div className="contact-pg-popup-content">
                <div className="contact-pg-popup-flex-container">
                    <RiCheckboxCircleFill className='contact-pg-popup-icon' />
                    <p>{message} </p>
                </div>
                <button  className='contact-pg-btn'onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;

