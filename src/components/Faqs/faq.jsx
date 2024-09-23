import React, { useState } from "react";
import "./faq.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const questions = [
  { id: 1, question: "What are the top localities in Bangalore for a comfortable and well-connected living experience?", answer: " Whitefield, Koramangala, Indiranagar, Jayanagar, Hebbal, Sarjapur Road, HSR Layout, Malleshwaram, Yelahanka, and Bannerghatta Road are well-connected, offering good amenities and access to IT hubs." },
  { id: 2, question: "What are the top luxury residential neighborhoods in Bangalore?", answer: " Indiranagar, Koramangala, Sadashivanagar, Whitefield, Jayanagar, Hebbal, Richmond Town, MG/Lavelle Road, Yelahanka, and Hennur offer premium real estate and lifestyle amenities." },
  { id: 3, question: "What are the essential criteria for choosing a locality in Bangalore?", answer: "Consider budget, proximity to work, amenities, connectivity, safety, future development, pollution levels, lifestyle, rental yield, and legal clearances." },
  { id: 4, question: "What types of legal documents are required when buying property in Bangalore, and how can you make sure you don’t miss any?", answer: "Ensure a clear title deed, sale deed, encumbrance certificate, Khata, tax receipts, occupancy certificate, building plan approval, NOC, and possession letter, verified by a legal expert." },
  {id:5, question:"What are the different types of property taxes that are applicable in Bangalore?", answer:"  Property tax, stamp duty, registration fees, capital gains tax, betterment charges, and land-use conversion charges apply to property transactions in Bangalore."}
];

export default function AssetsGlobalFAQs() {
  const [collapsed, setCollapsed] = useState({});

  const toggleCollapse = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="event-faq-container">
      {/* <h2>FAQs</h2> */}
      {questions.map(({ id, question, answer }) => (
        <React.Fragment key={id}>
          <div className="event-faq-div">
            <button
              className={`buttonq${id}`}
              onClick={() => toggleCollapse(id)}
            >
              {question}
              <span className={`arrow ${collapsed[id] ? "up" : ""}`}>
                <KeyboardArrowDownIcon />
              </span>
            </button>
            <p className={collapsed[id] ? "expand" : ""}>
              {answer}
            </p>
          </div>
          <div className="event-faq-divider" /> {/* Divider line */}
        </React.Fragment>
      ))}
    </div>
  );
}
