import { useState } from "react";
import "./HomeLoanCalculator.css";
import image from "../Images/property.webp";
import calc from "../Images/homeloanCalculator.jpg"

const HomeLoanCalculator = () => {




  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [otherEMIs, setOtherEMIs] = useState(0);
  const [loanEligibility, setLoanEligibility] = useState(0);

  const handleMonthlyIncomeChange = (event) => {
    setMonthlyIncome(event.target.value);
    calculateLoanEligibility(event.target.value, interestRate, tenure, otherEMIs);
  };

  const handleInterestRateChange = (event) => {
    setInterestRate(event.target.value);
    calculateLoanEligibility(monthlyIncome, event.target.value, tenure, otherEMIs);
  };

  const handleTenureChange = (event) => {
    setTenure(event.target.value);
    calculateLoanEligibility(monthlyIncome, interestRate, event.target.value, otherEMIs);
  };

  const handleOtherEMIsChange = (event) => {
    setOtherEMIs(event.target.value);
    calculateLoanEligibility(monthlyIncome, interestRate, tenure, event.target.value);
  };

  const calculateLoanEligibility = (income, rate, tenure, emis) => {
    // Calculate the maximum EMI the user can afford (40% of monthly income - other EMIs)
    const maxAffordableEMI = (income * 0.4) - emis;

    // Calculate the monthly interest rate
    const monthlyInterestRate = rate / (12 * 100);

    // Calculate the loan amount using the formula for EMI
    const loanAmount = maxAffordableEMI * ((1 - Math.pow(1 + monthlyInterestRate, -tenure)) / monthlyInterestRate);

    setLoanEligibility(Math.max(loanAmount, 0).toFixed(2)); // Ensure the loan amount is not negative
  };

  return (
    <div className="calculator-container" >
      <div className="calculate-container__top">
        <div className="calculate-container__heading">
          <h2 style={{ color: "white" }}>Home Loan Eligibility Calculator</h2>
          <p style={{ color: "white" }}>
            From finding to funding, we handle everything! Plan your dream
            property with our accurate financial calculator.
          </p>
        </div>
        {/* <div className="calculate-container__img">
          <img src={image} alt="Property"/>
        </div> */}
      </div>

      <div className="calculator-main-div">

        <div className="calculator-div">


          <div className="slidecontainer">
            <h3 style={{ alignSelf: "flex-start" }}>Calculate how much home loan you can get.</h3>
            <div className="calculator-input-div">
              <label>Monthly Net Income:</label>
              <input
                type="range"
                min="0"
                step={500}
                max="10000000"
                value={monthlyIncome}
                className="slider"
                onChange={handleMonthlyIncomeChange}
              />
              <p style={{ fontWeight: "bold", marginTop: '0' }} className="home-loan-calci-p-tag">₹ <span>{monthlyIncome}</span></p>
            </div>
            <div className="calculator-input-div">
              <label>Interest Rate (%):</label>
              <input
                type="range"
                min="1"
                max="20"
                step={0.5}
                value={interestRate}
                className="slider"
                onChange={handleInterestRateChange}
              />
              <p style={{ fontWeight: "bold", marginTop: '0' }}><span>{interestRate} %</span></p>
            </div>
            <div className="calculator-input-div">
              <label>Tenure (months):</label>
              <input
                type="range"
                min="1"
                max="30"
                value={tenure}
                className="slider"
                onChange={handleTenureChange}
              />
              <p style={{ fontWeight: "bold", marginTop: '0' }}><span>{tenure}  Year</span></p>
            </div>
            <div className="calculator-input-div">
              <label>Other EMIs:</label>
              <input
                type="range"
                min="0"
                step={500}
                max="1000000"
                value={otherEMIs}
                className="slider"
                onChange={handleOtherEMIsChange}
              />
              <p style={{ fontWeight: "bold", marginTop: '0' }}>₹ <span>{otherEMIs}</span></p>
            </div>
          </div>
          <div className="home_loan_amount" style={{ width: "80%", marginRight: "2rem", backgroundImage: `url(${calc})`, backgroundPosition: 'center', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
            <h3>Estimated Loan Eligibility</h3>
            <h3>₹ {loanEligibility}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanCalculator;
