import React from "react";
import { useNavigate } from "react-router-dom";
import "./facilities.css";
import Aos from "aos";
import "aos/dist/aos.css";
import about from "../Images/facilities/about.jpg";
import contact from "../Images/facilities/contact.jpg";
import loan from "../Images/facilities/loan.jpg";
import service from "../Images/facilities/services.jpg";
import partner from "../Images/facilities/partner.jpg";
import sell from "../Images/facilities/sell.jpg";

const Facilities = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const facilities = [
    { url: about, title: "Discover Our Core Values", path: "/aboutUs" },
    { url: contact, title: "We are Here to Help", path: "/reachUs" },
    { url: loan, title: "Home Financing Solutions", path: "/loan" },
    { url: service, title: "Explore Our Offerings", path: "/solutions" },
    { url: partner, title: "Collaborate with Our Team", path: "/partnerWithUs" },
    { url: sell, title: "Effective Selling Solutions", path: "/sell" },
  ];

  return (
    <div className="facilities-container">
      {facilities.map((facility, index) => (
        <div
          className="facility-card"
          key={index}
          onClick={() => navigate(facility.path)}
        >
          <div className="facility-card-title" data-aos="fade-right">
            {facility.title}
          </div>
          <div
            className="facility-card-image"
            data-aos="fade-up"
            style={{ backgroundImage: `url(${facility.url})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Facilities;
