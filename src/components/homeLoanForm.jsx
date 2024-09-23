import axios from "axios";
import React, { useState } from "react";

import HomeLoanAnemation from "./HomeLoanAneme";

import "./homeLoanForm.css";

const Homeloanform = () => {
  const [formData, setFormData] = useState({
    bankingPartner: "",
    email: "",
    name: "",
    phoneNumber: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)

    try {
      // Post request using Axios
      const response = await axios.post("http://localhost:8080/addLoanLeads", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      setSubmittedData(formData); // Update the submitted data state

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        bankingPartner: "",
      }); // Reset the form
      
    } catch (error) {
      console.error("Error submitting form:", error);
      // Error handling logic
      setSubmittedData(formData)
    }
  };

  return (
    <>
      <div className="homeLoan-container">
        <div className="homeLoan-container__relay">
          <div className="homeLoan-container__side-portion">
            <h2>Your Property - Your Future , Let Us Help You Get There...!</h2>
            <div className="aneme">
              <HomeLoanAnemation />
            </div>
          </div>

          <div className="homeLoan-container__form">
            <form onSubmit={handleSubmit}>
              <h4 style={{ color: "white", marginBottom: '0' }}>
                Please Fill Out The Form to Reach The Bank
              </h4>
              <div className="home-loan-input">
                <label className="label-item" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="home-loan-input">
                <label className="label-item" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="home-loan-input">
                <label className="label-item" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Your Phone"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <select
                className="bank partners"
                name="bankingPartner"
                value={formData.bankingPartner}
                onChange={handleInputChange}
                required
              >
                <option>Select </option>
                <option value="STATE_BANK_OF_INDIA">State bank of India</option>
                <option value="HDFC_BANK">HDFC Bank</option>
                <option value="KOTAK_MAHINDRA_BANK">Kotak Mahindra Bank</option>
                <option value="PUNJAB_NATIONAL_BANK">Punjab National Bank</option>
                <option value="BANK_OF_BARODA">Bank of Baroda</option>
                <option value="UNION_BANK_OF_INDIA">Union Bank of India</option>
                <option value="IDFC_FIRST_BANK">IDFC First Bank</option>
                <option value="FEDARAL_BANK">Fedaral Bank</option>
                <option value="BAJAJ_HOUSING_FINANCE">Bajaj Housing Finance</option>
                <option value="GODREJ_HOUSING_FINANCE">Godrej Housing Finance</option>
              </select>
              <button type="submit">Connect with Bank</button>
            </form>
            {/* {submittedData && (
              <div className="submitted-data">
                <h3>Submitted Data:</h3>
                <p><strong>Full Name:</strong> {submittedData.name}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
                <p><strong>Banking Partner:</strong> {submittedData.bankingPartner}</p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homeloanform;
