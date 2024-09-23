import { IoClose } from "react-icons/io5";

import AboutUsContactForm from '../AboutUsContactForm';

import './SinglePropModal.scss';
import { useEffect } from "react";

const headings = ['Download Broucher', 'Contact Us']

const SinglePropModal = ({ onClick, heading, modalName }) => {
    const headingClass = modalName === "Download Broucher" ? 'brochure-heading' : 'contact-heading';


    useEffect(() => {
        // Add class to body to disable scrolling
        document.body.classList.add('no-scroll');

        return () => {
            // Remove class when modal is closed
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className='spm'>
            <div className='custom-modal-container'>
                <h4 className={`spm-h4 ${headingClass}`}>{modalName}</h4>
                <button onClick={onClick} className='spm-button'><IoClose /></button>
                <AboutUsContactForm />
            </div>
        </div>
    )
}

export default SinglePropModal