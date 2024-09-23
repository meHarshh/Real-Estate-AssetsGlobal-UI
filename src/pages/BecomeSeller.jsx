import React, { useEffect, useState } from "react";
import "./BecomeSeller.css";
import BecomeSellerAnemation from "../components/becomSelleranemation";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import SellerForm from "../components/Seller";
import Popup from "../components/ContactPgPopup";

import { Helmet } from "react-helmet";

import "aos/dist/aos.css"
import Aos from "aos"

const PropertyFilter = () => {


  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phoneNumber: "",
    userRole: "",
  });

  const [err, setErr] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData);
      // Submit the form data
      axios.post('http://localhost:8080/addUser', formData)
        .then(response => {
          console.log('Form submitted successfully', response.data);
          setPopupMessage(response.data.message || "Form submitted successfully!");
          // setShowPopup(true);
          setErr(false);
          // Show the OTP modal if the user role is SELLER or BROKER
          if (formData.userRole === 'SELLER' || formData.userRole === 'BROKER') {
            setTimeout(() => {
              setOtpModalOpen(true);
            }, 1000); // 1-second delay for better UX
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          setPopupMessage("Error: " + (error.response?.data?.message || error.message));
          setShowPopup(true);
          setErr(true);
        });
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/verifyotp', {
      email: formData.userEmail,
      otp: otp
    })
      .then(response => {
        console.log('OTP verified and data sent to backend:', response.data);
        setOtpVerified(true);
        setOtpModalOpen(false);
        setPopupMessage(response.data.message || "OTP verified successfully!");
        setShowPopup(true);
        setOtp('');
        setErr(false); // Reset error state
      })
      .catch(error => {
        console.error('Error verifying OTP or sending data:', error);
        setPopupMessage("Error: " + (error.response?.data?.message || error.message));
        setShowPopup(true);
        setErr(true);
      });
  };

  return (
    <div
      className="service_container"
      data-aos="fade-up"
    >
      <Helmet>
        <title>Luxury Living: Explore Prime Properties with AssetsGlobal</title>
        <meta name="description" content="Indulge in opulent living with AssetsGlobal. 
        Discover exquisite prime properties that redefine luxury. 
        Elevate your lifestyle with our prestigious real estate offerings."/>
        <meta name="keywords" content="AssetsGlobal real estate" />
      </Helmet>
      <div className="service_background">
        <div className="main_aneme_div">
          <h2 style={{ color: "black", letterSpacing: "1px", fontSize: "32px" }}>
            Sell Smart With AssetsGlobal!
          </h2>
          <div className="aneme">{<BecomeSellerAnemation />}</div>
        </div>
        <div id="property-filter-container">
          <div
            className="become-seller-form-container"
            style={{
              display: "flex",
              // alignItems: "center",
            }}
          >
            {/* <div
              style={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#7ab945",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "left",
                  marginLeft: "1rem",
                }}
              >
                Please fill out the form to sell your property.
              </p>
            </div> */}
            {!otpVerified ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <form className="become-seller-contact-form" onSubmit={handleSubmit}>
                  <p >Please fill out the form to sell your property.</p>
                  <Tooltip title={errors.userName || ""} open={!!errors.userName} placement="top" arrow>
                    <div>
                      <input
                        className="become-seller-form-item"
                        type="text"
                        placeholder="Full Name"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        error={!!errors.userName}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title={errors.userEmail || ""} open={!!errors.userEmail} placement="top" arrow>
                    <div>
                      <input
                        className="become-seller-form-item"
                        type="email"
                        placeholder="Email Address"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        error={!!errors.userEmail}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title={errors.phoneNumber || ""} open={!!errors.phoneNumber} placement="top" arrow>
                    <div>
                      <input
                        className="become-seller-form-item"
                        type="number"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={!!errors.phoneNumber}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </div>
                  </Tooltip>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                      margin: "0",
                    }}
                  >
                    <Tooltip title={errors.userRole || ""} open={!!errors.userRole} placement="top" arrow>
                      <div>
                        <label className="become-seller-label">I am Seller</label>
                        <input
                          type="radio"
                          value="SELLER"
                          name="userRole"
                          style={{ width: "25px" }}
                          checked={formData.userRole === "SELLER"}
                          onChange={handleChange}
                        />

                        <label className="become-seller-label">Broker</label>
                        <input
                          type="radio"
                          value="BROKER"
                          name="userRole"
                          style={{ width: "25px" }}
                          checked={formData.userRole === "BROKER"}
                          onChange={handleChange}
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <input
                    id="become-seller-form-submit"
                    className="become-seller-form-item"
                    type="submit"
                    value="SUBMIT"
                  />
                </form>
              </div>
            ) : (
              <div>
                {/* Second form to be shown after OTP verification */}
                <SellerForm />
                {/* Add your additional form fields here */}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={otpModalOpen && !err}
        onClose={() => setOtpModalOpen(false)}
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
          <h2 id="otp-modal-title">{popupMessage}</h2>
          <form onSubmit={handleOtpSubmit}>

            <input
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
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default PropertyFilter;
