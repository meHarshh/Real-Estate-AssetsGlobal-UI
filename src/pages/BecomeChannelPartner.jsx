import axios from 'axios';
import { useState } from 'react';

import Popup from '../components/ContactPgPopup';

import '../components/loading.scss';
import './BecomeChannelPartner.scss';

const initialSecondFormFields = {
    channelPartnerType: 'Individual',
    channelPartnerName: '',
    channelPartnerEmail: '',
    channelPartnerPhone: '',
    channelPartnerOwner: '',
    channelPartnerAddress: '',
};

const BecomeChannelPartner = () => {
    const [loading, setLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [secondFormData, setSecondFormData] = useState({ ...initialSecondFormFields });
    const [showPopup, setShowPopup] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState({});

    const validateSecondFormInput = (fieldname, value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;

        switch (fieldname) {
            case 'channelPartnerEmail':
                return emailPattern.test(value);
            case 'channelPartnerPhone':
                return phonePattern.test(value);
            case 'channelPartnerName':
            case 'channelPartnerOwner':
            case 'channelPartnerAddress':
                return value.trim() !== '';
            default:
                return true
        }
    };

    const handleSecondFormSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.keys(secondFormData).every((key) => validateSecondFormInput(key, secondFormData[key]));

        if (isValid) {
            setLoading(true);

            try {
                const formData = new FormData();

                Object.keys(secondFormData).forEach((key) =>
                    formData.append(key, secondFormData[key])
                );

                const response = await axios.post('http://localhost:8080/addChannelPartner', secondFormData);
                const message = response.data.message;


                setPopupMessage(message);
                setShowPopup(true);
                setSecondFormData(initialSecondFormFields);
                setTouched({});
            } catch (error) {
                console.error('Error submitting second form', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.log('Validation failed');
        }
    };

    const handleSecondFormChange = (e) => {
        const { name, value } = e.target;
        setSecondFormData({ ...secondFormData, [name]: value });
        setTouched({ ...touched, [name]: true }); // Mark field as touched
        // console.log('Field Changed:', name, 'Value:', value);
    };

    return (
        <div className='channel-main-container'>
            <div className='channel-partner-heading-details'>
                <h1 className='channel-partner-heading'>Asset's Associate</h1>
                <div className="channel-partner-details-div">
                    <h2>Get Associated with <span>Assets Global</span></h2>
                    <p>At Assets Global, we value our relationship with our Channel Partners and look forward to
                        building a long term association with mutual benefits.</p>
                    <p>As a Channel Partner you get priority updates on offers and new launches,
                        marketing support and training, invites to exclusive events, attractive commission schemes,
                        timely pay-outs, and much more! Join us today to become an Esteemed Partner and
                        reap the benefits of partnering with Assets Global.</p>
                </div>
            </div>
            <div className='channel-partner-second-form-div'>
                <form action="" className='channel-partner-second-form' onSubmit={handleSecondFormSubmit}>
                    <p className='c-p-line-second'>Please fill out the form</p>
                    <div>
                        <label htmlFor="cp-type">Type of CP (Individual/Company)</label>
                        <select name="channelPartnerType" id="cp-type" value={secondFormData.channelPartnerType} onChange={handleSecondFormChange}>
                            <option value="Individual">Individual</option>
                            <option value="Company">Company</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cp-name">Individual/Company Name <span>&#42;</span>:</label>
                        <input type="text" id='cp-name' name='channelPartnerName' value={secondFormData.channelPartnerName} onChange={handleSecondFormChange} required />
                    </div>
                    <div>
                        <label htmlFor="cp-email">Individual/Company Email<span>&#42;</span>:</label>
                        <input type="email" id='cp-email' name='channelPartnerEmail' value={secondFormData.channelPartnerEmail} onChange={handleSecondFormChange} required />
                    </div>
                    <div>
                        <label htmlFor="cp-phone">Mobile Number<span>&#42;</span>:</label>
                        <input type="text" id='cp-phone' name='channelPartnerPhone' value={secondFormData.channelPartnerPhone} onChange={handleSecondFormChange} required />
                    </div>
                    <div>
                        <label htmlFor="cp-owner">Owner/Director Details<span>&#42;</span>:</label>
                        <input type="text" name="channelPartnerOwner" id="cp-owner" value={secondFormData.channelPartnerOwner} onChange={handleSecondFormChange} required />
                    </div>
                    <div>
                        <label htmlFor="cp-work">Office/Work Address<span>&#42;</span>:</label>
                        <input type="text" id='cp-work' name='channelPartnerAddress' value={secondFormData.channelPartnerAddress} onChange={handleSecondFormChange} />
                    </div>
                    <div>
                        <button type='submit' className='c-partner-second-submit-btn' style={{ cursor: 'pointer' }}>Submit</button>
                    </div>
                </form>
            </div>
            {/* {
                loading && (
                    <div className="loader-container">
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>
                    </div>
                )
            } */}
            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </div >
    )
}

export default BecomeChannelPartner;
