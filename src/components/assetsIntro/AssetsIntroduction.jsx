import React from "react";
import bg from "../../Images/Images/intro.jpg";
import logo from "../../Images/assetsIntro/ASSETS GLOBAL LOGO-02.png";
import "./AssetsIntroduction.css"; // Ensure this is imported

const AssetsIntroduction = () => {
  return (
    <div>
      <h1>About Us</h1>
      <div className="assets-intro-container-div">
        <div
          className="assets-intro-left-side"
        // style={{
        //   backgroundImage: `url(${bg})`,
        //   backgroundSize: "contain",
        //   backgroundRepeat: "no-repeat",
        //   width: "100%",
        // }}
        >
          <img src={bg} alt="bg" className="intro-bg-img" />
          <img src={logo} alt="logo" className="intro-assets-logo" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
        <div className="assets-intro-right-side" >
          <p>At <strong>AssetsGlobal</strong>, we are deeply committed to fostering lasting trust by upholding the highest standards of integrity and transparency. Every interaction we engage in is a testament to our dedication to ethical excellence, ensuring that our clients and partners experience the utmost confidence in our services.</p>
          <p>Our relentless pursuit of innovation positions us as trailblazers in the real estate industry. We deliver cutting-edge solutions that not only meet but consistently exceed client expectations. By transforming simple transactions into meaningful, long-term partnerships, we drive mutual success and create enduring value in every venture.</p>
        </div>
      </div>

    </div>
  );
};

export default AssetsIntroduction;
