import React, { useState, useRef, useEffect } from "react";
import "./ServicesHome.css";
import home from "../Images/servicesImages/home presentaion.jpg";
import virtual from "../Images/servicesImages/virtual presentation.jpg";
import pick from "../Images/servicesImages/pick and drop cab service.jpg";
import cash from "../Images/servicesImages/Cash backs.jpg";
import refer from "../Images/servicesImages/refferal bonuses.jpg";
import festive from "../Images/servicesImages/festive offers.jpg";
import doorstep from "../Images/servicesImages/doors step home loan services.jpg";
import industry from "../Images/servicesImages/Industry experts guidance.jpg";
import brokerage from "../Images/servicesImages/zero brokerage.jpg";
import etoe from "../Images/servicesImages/end to end services.jpg";
import best from "../Images/servicesImages/refferal bonuses.jpg";
import confident from "../Images/servicesImages/global expertise.jpg";
import one from "../Images/servicesImages/first.jpg";
import two from "../Images/servicesImages/second.jpg";
import three from "../Images/servicesImages/three.jpg";
import four from "../Images/servicesImages/four.jpeg";
import five from "../Images/servicesImages/five.jpg";
import six from "../Images/servicesImages/six.jpeg";
import seven from "../Images/servicesImages/seven.jpg";
import eight from "../Images/servicesImages/eight.jpg";
import nine from "../Images/servicesImages/nine.jpg";
import ten from "../Images/servicesImages/ten.jpg";
import eleven from "../Images/servicesImages/eleven.jpg";
import twelve from "../Images/servicesImages/twelve.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

// Services data
export const service = [
  {
    icon: one,
    url: home,
    title: "Home Presentation",
    description:
      "Our home presentation service showcases your property using expert staging techniques. We arrange furniture and add decorative elements to create an inviting atmosphere, enhancing the home's appeal and resonating with potential buyers.",
  },
  {
    icon: two,
    url: virtual,
    title: "Virtual Presentation",
    description:
      "We provide high-quality photography and virtual tours, capturing the essence of the property. Prospective clients can explore every corner from their device, generating interest and leading to faster sales or rentals.",
  },
  {
    icon: three,
    url: pick,
    title: "Pick & Drop Service",
    description:
      "Enjoy a stress-free viewing experience with our complimentary pick-up and drop-off cab services. We arrange comfortable rides to and from the property, letting you focus on exploring your potential new home without transport worries.",
  },
  {
    icon: four,
    url: cash,
    title: "Cash Backs",
    description:
      "We offer exclusive cashback incentives with our home presentation services. Choosing Assets Global not only ensures expert home presentation but also rewards you with cashbacks, adding value to your investment.",
  },
  {
    icon: five,
    url: refer,
    title: "Referral Bonuses",
    description:
      "Earn rewards by referring others to Assets Global. Enjoy exceptional home presentation services and referral bonuses, creating a win-win scenario that benefits you and expands our network of satisfied clients.",
  },
  {
    icon: six,
    url: festive,
    title: "Festive Offers",
    description:
      "Take advantage of our festive offers during holidays and special occasions. Enjoy limited-time discounts and incentives on home presentation services, enhancing your property's appeal while enjoying significant savings.",
  },
  {
    icon: seven,
    url: doorstep,
    title: "Home Loan Services",
    description:
      "Our loan specialists bring financing services to your doorstep. Avoid the hassle of visiting multiple banks. we make the loan application process effortless and accessible, saving your time and effort.",
  },
  {
    icon: eight,
    url: industry,
    title: "Experts Guidance",
    description:
      "Gain access to invaluable insights and expertise from seasoned professionals. Our experts offer strategic advice and recommendations to help you make informed decisions and achieve your real estate goals.",
  },
  {
    icon: nine,
    url: brokerage,
    title: "Zero Brokerage",
    description:
      "Our zero brokerage services offer cost-effective solutions for buying, selling, or renting properties. By eliminating traditional brokerage commissions, we make real estate transactions more accessible and affordable.",
  },
  {
    icon: ten,
    url: etoe,
    title: "End-to-End Services",
    description:
      "Our end-to-end services cover every aspect of your real estate journey. From initial consultation to final transaction, we manage the entire process, allowing you to focus on your goals with confidence.",
  },
  {
    icon: eleven,
    url: best,
    title: "Best Offers & Deals",
    description:
      "We specialize in sourcing the best-in-market offers and deals, providing access to exclusive listings and a wide selection of discounted properties, ensuring you have access to the most attractive opportunities available.",
  },
  {
    icon: twelve,
    url: confident,
    title: "Data Confidentiality",
    description:
      "We prioritize the confidentiality and security of your data. Our strict privacy measures and industry best practices ensure that your personal and sensitive information is protected and handled with utmost discretion.",
  },
];

const ServicesHome = () => {
  const [selectedService, setSelectedService] = useState({ serviceData: null, index: null });
  const popupRef = useRef(null);

  const handleClick = (index) => {
    setSelectedService({ serviceData: service[index], index });
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setSelectedService({ serviceData: null, index: null });
  };

  useEffect(() => {
    if (selectedService.serviceData && popupRef.current) {
      popupRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedService]);

  return (
    <div className="services-container">
      {service.map((item, index) => (
        <div
          data-aos="zoom-in-up"
          className="service-card"
          key={index}
          onClick={() => handleClick(index)}
        >
          <div className="overlay">
            <div>
              <img src={item.icon} alt="icon" width={85} height={85} data-aos="zoom-out" />
            </div>
            <p className="service-title" data-aos="zoom-out">{item.title}</p>
          </div>
        </div>
      ))}

      {selectedService.serviceData && (
        <div className="service-popup" ref={popupRef} onClick={handleClose}>
          <div className="service-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="service-popup-header">
              <img
                data-aos="fade-right"
                src={selectedService.serviceData.icon}
                alt="icon"
                width={50}
                height={50}
              />
              <h2 data-aos="fade-left">{selectedService.serviceData.title}</h2>
            </div>
            <p data-aos="fade-up">{selectedService.serviceData.description}</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesHome;
