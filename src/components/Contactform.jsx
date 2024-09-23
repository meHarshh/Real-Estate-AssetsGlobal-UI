import React, { useState } from 'react';
// import bg from "../Images/homePageFormImg.jpg";
import bg from "../Images/rendering-miniature-world.jpg"
import "./ContactForm.css";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SellerForm from './Seller';
import axios from 'axios';
import { Button } from '@mui/material';
import Popup from './ContactPgPopup';
import Aos from "aos";
import "aos/dist/aos.css";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    phoneNumber: '',
    userRole: ''
  });
  const [errors, setErrors] = useState({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showCheckboxWarning, setShowCheckboxWarning] = useState(false);
  const [showProperty, setShowProperty] = useState(false);
  const [otp, setOtp] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCheckboxChecked) {
      setShowCheckboxWarning(true);
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    postData();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/verifyotp', {
      email: formData.userEmail,
      otp: otp
    })
      .then(response => {
        console.log('OTP verified and data sent to backend:', response.data);
        setShowOtpModal(false);
        setShowProperty(true);
        setShowPopup(true);
        setPopupMessage(response.data.message);
        setOtp('');
        setErr(false); // Reset error state
      })
      .catch(error => {
        console.error('Error verifying OTP or sending data:', error);
        setShowPopup(true);
        setPopupMessage('Error: ' + error.response.data.message || 'An error occurred.');
        setErr(true);
      });
  };

  const postData = () => {
    axios.post('http://localhost:8080/addUser', formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          console.log('Form data submitted:', response.data);
          setPopupMessage(formData.userRole === "BUYER" ? "Registered Successfully!" : response.data.message);
          setErr(false);

          if (formData.userRole === 'SELLER' || formData.userRole === 'BROCKER') {
            setTimeout(() => {
              setShowOtpModal(true);
            }, 1000); // 1 second delay
          }
        } else {
          console.error('Unexpected response status:', response.status);
          setShowOtpModal(false);
          setPopupMessage('Unexpected response status: ' + response.status);
          setErr(true);
          setShowPopup(true);
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setPopupMessage('Error: ' + error.message || 'An error occurred.');
        setShowOtpModal(false);
        setErr(true);
        setShowPopup(true);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = "Full Name is required";
    if (!formData.userEmail) newErrors.userEmail = "Email is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
    }
    if (!formData.userRole) newErrors.userRole = "User Type is required";
    return newErrors;
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtp(''); // Clear OTP input if modal is closed
  };

  const handleCloseCheckboxWarning = () => {
    setShowCheckboxWarning(false);
  };

  const closeModal = () => {
    setShowProperty(false);
  };

  return (
    <>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}

      <div className="contact_container">
        <div className="contact_form_container">
          <div className="contact_img" data-aos="fade-right">
            <img src={bg} alt="Contact Background" style={{ opacity: '0.9', objectFit:"cover" }} />
          </div>
          <div className="form-container" data-aos="fade-left">
            <div>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>Get your queries resolved by filling up this form.</p>
            </div>
            <div className='contact-form-div' style={{ width: "100%", display: "flex", justifyContent: "center"}}>
              <form className="contact_form" onSubmit={handleSubmit}>
                <Tooltip title={errors.userName || ""} open={!!errors.userName} placement="top" arrow>
                  <input
                    className="form_item"
                    type="text"
                    placeholder="Full Name"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </Tooltip>
                <Tooltip title={errors.userEmail || ""} open={!!errors.userEmail} placement="top" arrow>
                  <input
                    className="form_item"
                    type="email"
                    placeholder="Email Address"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                  />
                </Tooltip>
                <Tooltip title={errors.phoneNumber || ""} open={!!errors.phoneNumber} placement="top" arrow>
                  <input
                    className="form_item"
                    type="number"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </Tooltip>
                <Tooltip title={errors.userRole || ""} open={!!errors.userRole} placement="top" arrow>
                  <div className='label-radio'>
                    <div className="radio-input">
                      <label>I am Buyer</label>
                      <input
                        type="radio"
                        value="BUYER"
                        name="userRole"
                        checked={formData.userRole === 'BUYER'}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="radio-input">
                      <label>Seller</label>
                      <input
                        type="radio"
                        value="SELLER"
                        name="userRole"
                        checked={formData.userRole === 'SELLER'}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="radio-input">
                      <label>Broker</label>
                      <input
                        type="radio"
                        value="BROKER"
                        name="userRole"
                        checked={formData.userRole === 'BROKER'}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </Tooltip>
                <div className="form_footer">
                  <p style={{ fontSize: "0.8rem" }}>
                    <small style={{ display: "flex" }}>
                      <span>
                        <input
                          type='checkbox'
                          checked={isCheckboxChecked}
                          onChange={handleCheckboxChange}
                        />
                      </span>
                      &nbsp;I authorize ASSETS GLOBAL and its representatives to contact me via Call, SMS, Email, or WhatsApp regarding its products and offers.


                    </small>
                  </p>
                </div>
                <input
                  id="form_submit"
                  className="form_item"
                  type="submit"
                  value="SUBMIT"
                />
              </form>
            </div>
            <div className="form_footer">
              <p style={{ textAlign: "center" }}>Reach out to us at <span style={{ color: "#009933", fontWeight: "bold" }}>+91 77950 39691</span></p>
            </div>
          </div>
        </div>
      </div>

      {!err && (
        <Modal
          open={showOtpModal}
          onClose={handleCloseOtpModal}
          aria-labelledby="otp-modal-title"
          aria-describedby="otp-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="otp-modal-title">Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <p>{popupMessage}</p>
              <TextField
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <input
                id="otp-form-submit"
                className="become-seller-form-item"
                type="submit"
                value="SUBMIT OTP"
              />
            </form>
          </Box>
        </Modal>
      )}

      {showCheckboxWarning && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <p>Please check the authorization checkbox before submitting.</p>
            <button onClick={handleCloseCheckboxWarning}>Close</button>
          </div>
        </div>
      )}

      {showProperty && (
        <div className='home-page-seller-popup-property-form'>
          <Modal open={showProperty} onClose={closeModal}>
            <SellerForm />
          </Modal>
        </div>
      )}
    </>
  );
};

export default ContactForm;
