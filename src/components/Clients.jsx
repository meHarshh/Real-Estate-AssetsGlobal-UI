
import React from "react";
import './Clients.scss' // Import your CSS file for styling
import { useNavigate } from "react-router-dom";

// Import your images
import prestige from "../Images/clients/1.jpeg"
import provident from "../Images/clients/2.jpeg"
import brigade from "../Images/clients/3.jpeg"
import puravankara from "../Images/clients/4.jpeg"
import casaGrand from "../Images/clients/5.jpeg"
import godrej from "../Images/clients/6.jpeg"
import sobha from "../Images/clients/7.jpeg"
import abheeVentures from "../Images/clients/8.jpeg"
import lTRealty from "../Images/clients/9.jpeg"
import shriRam from "../Images/clients/10.jpeg"
import tvsEmerald from '../Images/clients/tvs-logo.jpeg'

import mantri from "../Images/clients/11.jpeg";
import sattva from "../Images/clients/12.jpeg";
import assetz from "../Images/clients/13.jpeg";
import dsMax from "../Images/clients/14.jpeg";
import lodha from "../Images/clients/15.jpeg";
import bharatiya from "../Images/clients/16.jpeg";

import bankPartner1 from "../Images/bankparters/1.jpeg"
import bankPartner2 from "../Images/bankparters/2.jpeg"
import bankPartner3 from "../Images/bankparters/3.jpeg"
import bankPartner4 from "../Images/bankparters/4.jpeg"
import bankPartner5 from "../Images/bankparters/5.jpeg"
import bankPartner6 from "../Images/bankparters/6.jpeg"


import Aos from "aos";
import "aos/dist/aos.css";

const developers = [
  { name: "prestige", hasProperties: true },
  { name: "provident", hasProperties: false },
  { name: "brigade", hasProperties: true },
  { name: "puravankara", hasProperties: true },
  { name: "casaGrand", hasProperties: true },
  { name: "godrej", hasProperties: true },
  { name: "sobha", hasProperties: true },
  { name: "abheeVentures", hasProperties: false },
  { name: "lTRealty", hasProperties: false },
  { name: "shriram properties", hasProperties: true },
  { name: "tvs Emerald", hasProperties: true },
  { name: "mantri", hasProperties: true },
  { name: "sattva", hasProperties: false },
  { name: "assetz", hasProperties: false },
  { name: "dsMax", hasProperties: false },
  { name: "lodha", hasProperties: true },
  { name: "bharatiya", hasProperties: false }
];

const items = [
  { src: prestige, name: "prestige" },
  { src: provident, name: "provident" },
  { src: brigade, name: "brigade" },
  { src: puravankara, name: "puravankara" },
  { src: casaGrand, name: "casaGrand" },
  { src: godrej, name: "godrej" },
  { src: sobha, name: "sobha" },
  { src: abheeVentures, name: "abheeVentures" },
  { src: lTRealty, name: "lTRealty" },
  { src: shriRam, name: "shriram properties" },
  { src: tvsEmerald, name: "tvsEmerald" },
  { src: mantri, name: "mantri" },
  { src: sattva, name: "sattva" },
  { src: assetz, name: "assetz" },
  { src: dsMax, name: "dsMax" },
  { src: lodha, name: "lodha" },
  { src: bharatiya, name: "bharatiya" }
]
const Clients = () => {
  const navigate = useNavigate();

  const normalizeString = (str) => str.trim().toLowerCase();

  const getClientLink = (developerName) => {
    const normalizedName = normalizeString(developerName);
    const developer = developers.find(dev => normalizeString(dev.name) === normalizedName);
    return developer && developer.hasProperties ? `/developer/${normalizedName}` : "/developing";
  };

  console.log(getClientLink)

  // const handleViewProperty = () => {
  //   const propertySlug = (property.name || "").replace(/\s+/g, '-').toLowerCase();
  //   navigate(`/singleProperty/${propertySlug}`, {
  //     state: { property }
  //   });
  // };
  const handleClientClick = (developerName) => {
    const link = getClientLink(developerName);
    navigate(link);
  };

  const bankPartnerItems = [
    bankPartner1,
    bankPartner2,
    bankPartner3,
    bankPartner4,
    bankPartner5,
    bankPartner6
  ]

  return (
    <div className="clients-container">
      <section className="client-partners">
        <h1>Our Clients</h1>
        <div className="clients-grid">
          {items.map((item, index) => (
            // <a key={index} href={getClientLink(item.name)}>
            <a key={index} onClick={() => handleClientClick(item.name)}>
              <img
                src={item.src}
                data-aos="flip-up"
                className="client-image"
                alt={`Client ${index + 1}`}
              />
            </a>
          ))}
        </div>
      </section>
      {/* <section className="bank-partners">
        <h1>Our Bank Partners</h1>
        <div className="bank-partners-grid">
          {bankPartnerItems.map((item, idx) => (
            <img key={idx} src={item} className="bank-partner-image" alt={`Bank Partner ${idx + 1}`} />
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Clients;
