// CartoonPopup.jsx

import React, { useState } from "react";
import "./Cartoon.css";

const CartoonPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button className="open-popup-btn" onClick={togglePopup}>
        Open Popup
      </button>

      {isVisible && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img
              src="https://example.com/cartoon-character.png" // Replace with your cartoon image URL
              alt="Cartoon Character"
              className="cartoon-image"
            />
            <div className="message-holder">
              <p>Hello! This is your message.</p>
              <button className="close-popup-btn" onClick={togglePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartoonPopup;
