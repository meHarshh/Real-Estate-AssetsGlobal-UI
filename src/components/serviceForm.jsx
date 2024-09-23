import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Serviceform.css';

const ServiceForm = ({ serviceType }) => {
    const [showFields, setShowFields] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
        day: '',
        time: '',
        serviceType
    });

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            serviceType
        }));
    }, [serviceType]);

    const toggleFields = () => {
        setShowFields(!showFields);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };
    console.log(formData)
    const sendEmail = async () => {
        const { name, email, phoneNumber, message, day, time } = formData;

        if (name && email && message) {
            try {
                const response = await axios.post('http://localhost:8080/registerServiceLeads', {
                    name,
                    email,
                    phoneNumber: parseInt(phoneNumber, 10), // Ensure phoneNumber is sent as a number
                    message,
                    day,
                    time,
                    serviceType
                });
                console.log(response.message, response.data);
                alert(response.message);
                // Clear form after submission
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    message: '',
                    day: '',
                    time: '',
                    serviceType: '' // Ensure the default reset value
                });
            } catch (error) {
                console.error('Error submitting form', error);
                alert('Error sending email. Please try again later.');
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className="contact-form">
            <h2>Contact Me</h2>

            <button onClick={toggleFields} id="toggleButton">
                {showFields ? 'Cancel' : 'Schedule a showing?'}
            </button>
            {showFields && (
                <div className="form-group">
                    <input
                        type="date"
                        id="day"
                        placeholder="Day"
                        value={formData.day}
                        onChange={handleChange}
                    />
                    <input
                        type="time"
                        id="time"
                        placeholder="Time"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>
            )}

            <div className="form-group">
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    id="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <textarea
                    id="message"
                    placeholder="I'm interested in [ Services ]"
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>
            <button onClick={sendEmail}>Send Email</button>
        </div>
    );
};

export default ServiceForm;
