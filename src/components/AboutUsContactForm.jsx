
import axios from 'axios';
import { useState } from 'react';
import { IoIosPhonePortrait } from 'react-icons/io';
import { MdOutlineEmail } from 'react-icons/md';
import { RiUser3Line } from 'react-icons/ri';
import Popup from './ContactPgPopup';
import Tooltip from '@mui/material/Tooltip'; // Ensure @mui/material is installed

import './AboutUsContactForm.scss';
import './loading.scss'

const ContactForm = ({ className = "" }) => {

    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state

    const initialFields = {
        name: '',
        email: '',
        message: '',
        mobileNumber: ''
    };

    const [data, setData] = useState(initialFields);
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState({}); // Track touched fields
    
    const validateInput = (fieldname, value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;
        let error = '';
        switch (fieldname) {
            case 'email':
                error = emailPattern.test(value) ? '' : 'Invalid email address';
                break;
            case 'mobileNumber':
                error = phonePattern.test(value) ? '' : 'Invalid phone number';
                break;
            case 'name':
            case 'message':
                error = value.trim() !== '' ? '' : `${fieldname} is required`;
                break;
            default:
                break;
        }
        return error; // Ensure to return the error message
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setTouched({ ...touched, [name]: true }); // Mark field as touched
        setErrors({ ...errors, [name]: validateInput(name, value) }); // Update errors state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = Object.keys(data).reduce((acc, key) => {
            const error = validateInput(key, data[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});

        if (Object.keys(newErrors).length === 0) {
            setLoading(true); // Set loading to true
            try {
                const response = await axios.post('http://localhost:8080/addLeads', data);
                setSubmitted(true);
                const message = response.data.message;

                setPopupMessage(message);
                setShowPopup(true);
                setData(initialFields);
                setTouched({}); // Clear touched state to remove red border
            } catch (error) {
                console.error('Error submitting form', error);
            } finally {
                setLoading(false); // Set loading to false
            }
        } else {
            setErrors(newErrors); // Update errors state with new validation errors
            console.log('Validation failed');
        }
    };


    return (
        <div className={`contact-form-container ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    {/* <div className="label-icon">
                        <RiUser3Line className="icon" />
                        <label htmlFor="name">Full Name</label>
                    </div> */}
                    <Tooltip title={errors.name || ""} open={!!errors.name} placement="top" arrow>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder='Full Name'
                        value={data.name}
                        onChange={handleChange}
                        className={touched.name ? (validateInput('name', data.name) ? 'valid' : 'invalid') : ''}
                        disabled={loading}
                    />
                    </Tooltip>
                </div>

                <div className="input-group">
                    {/* <div className="label-icon">
                        <MdOutlineEmail className="icon" />
                        <label htmlFor="email">Email</label>
                    </div> */}
                    <Tooltip title={errors.email || ""} open={!!errors.email} placement="top" arrow>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email Address'
                        value={data.email}
                        onChange={handleChange}
                        className={touched.email ? (validateInput('email', data.email) ? 'valid' : 'invalid') : ''}
                        disabled={loading}
                    />
                    </Tooltip>
                </div>

                <div className="input-group">
                    {/* <div className="label-icon">
                        <IoIosPhonePortrait className="icon" />
                        <label htmlFor="mobileNumber">Phone number</label>
                    </div> */}
                    <Tooltip title={errors.mobileNumber || ""} open={!!errors.mobileNumber} placement="top" arrow>
                    <input
                        type="text"
                        name="mobileNumber"
                        id="mobileNumber"
                        placeholder='Phone Number'
                        value={data.mobileNumber}
                        onChange={handleChange}
                        className={touched.mobileNumber ? (validateInput('mobileNumber', data.mobileNumber) ? 'valid' : 'invalid') : ''}
                        disabled={loading}
                    />
                    </Tooltip>
                </div>

                <div className="input-group">
                    {/* <label htmlFor="message">Message</label> */}
                    <textarea
                        id="message"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        placeholder="Describe your text.."
                        className={touched.message ? (validateInput('message', data.message) ? 'valid' : 'invalid') : ''}
                        disabled={loading}
                    />
                </div>
                <button type="submit" className='btn-submit'>Schedule a Visit</button>
                {loading && (
                    <div class="loader-container">
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                    </div>
                )}
            </form>
            
            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default ContactForm;
// import axios from 'axios';
// import { useState } from 'react';
// import { IoIosPhonePortrait } from 'react-icons/io';
// import { MdOutlineEmail } from 'react-icons/md';
// import { RiUser3Line } from 'react-icons/ri';
// import Popup from './ContactPgPopup';
// import Tooltip from '@mui/material/Tooltip'; // Ensure @mui/material is installed
// import './AboutUsContactForm.scss';
// import './loading.scss';

// const ContactForm = ({ className = "" }) => {
//     const [popupMessage, setPopupMessage] = useState('');
//     const [showPopup, setShowPopup] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: '',
//         mobileNumber: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [touched, setTouched] = useState({});

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name) newErrors.name = "Full Name is required";
//         if (!formData.email) newErrors.email = "Email is required";
//         if (!formData.mobileNumber) {
//             newErrors.mobileNumber = "Phone Number is required";
//         } else if (formData.mobileNumber.length !== 10) {
//             newErrors.mobileNumber = "Phone Number must be exactly 10 digits";
//         }
//         // Remove validation for message field
//         return newErrors;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setTouched({ ...touched, [name]: true });
//         setErrors({ ...errors, [name]: undefined }); // Clear error for the field
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     const validationErrors = validateForm();
//     //     if (Object.keys(validationErrors).length === 0) {
//     //         setLoading(true);
//     //         try {
//     //             await axios.post('http://localhost:8080/addLeads', formData);
//     //             setPopupMessage('Thank you for your submission!'); // Set the thank you message
//     //             setShowPopup(true);
//     //             // Reset form fields and states
//     //             setFormData({ name: '', email: '', message: '', mobileNumber: '' });
//     //             setErrors({});
//     //             setTouched({});
//     //         } catch (error) {
//     //             console.error('Error submitting form', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     } else {
//     //         setErrors(validationErrors);
//     //     }
//     // };
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validate form
//         const validationErrors = validateForm();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return; // Stop further processing if there are validation errors
//         }

//         // Set loading to true before starting the submission
//         setLoading(true);

//         setTimeout(() => {
//             // Simulate successful form submission
//             setPopupMessage('Thank you for registering, our team will get back to you.!');
//             setShowPopup(true);

//             // Clear form fields
//             setFormData({ name: '', email: '', message: '', mobileNumber: '' });
            
//             // Clear errors and touched fields
//             setErrors({});
//             setTouched({});
//             setLoading(false); // Set loading to false after the submission is complete
//         }, 2000); // Simulate a 2-second delay for the API call
//     };
//     return (
//         <div className={`contact-form-container ${className}`}>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-group">
//                     <Tooltip title={errors.name || ""} open={!!errors.name} placement="top" arrow>
//                         <div>
//                             <RiUser3Line className="icon" />
//                             <label htmlFor="name">Full Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 id="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className={touched.name ? (errors.name ? 'invalid' : 'valid') : ''}
//                                 disabled={loading}
//                             />
//                         </div>
//                     </Tooltip>
//                 </div>

//                 <div className="input-group">
//                     <Tooltip title={errors.email || ""} open={!!errors.email} placement="top" arrow>
//                         <div>
//                             <MdOutlineEmail className="icon" />
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className={touched.email ? (errors.email ? 'invalid' : 'valid') : ''}
//                                 disabled={loading}
//                             />
//                         </div>
//                     </Tooltip>
//                 </div>

//                 <div className="input-group">
//                     <Tooltip title={errors.mobileNumber || ""} open={!!errors.mobileNumber} placement="top" arrow>
//                         <div>
//                             <IoIosPhonePortrait className="icon" />
//                             <label htmlFor="mobileNumber">Phone Number</label>
//                             <input
//                                 type="text"
//                                 name="mobileNumber"
//                                 id="mobileNumber"
//                                 value={formData.mobileNumber}
//                                 onChange={handleChange}
//                                 className={touched.mobileNumber ? (errors.mobileNumber ? 'invalid' : 'valid') : ''}
//                                 disabled={loading}
//                             />
//                         </div>
//                     </Tooltip>
//                 </div>

//                 <div className="input-group">
//                     <div>
//                         <label htmlFor="message">Message</label>
//                         <textarea
//                             id="message"
//                             name="message"
//                             value={formData.message}
//                             onChange={handleChange}
//                             placeholder="Describe your text.."
//                             className={touched.message ? (errors.message ? 'invalid' : 'valid') : ''}
//                             disabled={loading}
//                         />
//                     </div>
//                 </div>

//                 <button type="submit" className='btn-submit'>Schedule a Visit</button>
//                 {loading && (
//                     <div className="loader-container">
//                         <div className="progress-bar">
//                             <div className="progress"></div>
//                         </div>
//                     </div>
//                 )}
//             </form>
            
//             {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
//         </div>
//     );
// };

// export default ContactForm;
