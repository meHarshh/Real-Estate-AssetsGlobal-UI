import React from "react";
import "./PopupAllPgForm.scss";

const PopupAllPgForm = ({ onClose, children }) => {
    return (
        <div className="popup-all-pg-modal">
            <div className="popup-all-pg-modal-content">
                <p className="popup-all-pg-form-p">Enquiry Form </p>
                <span className="popup-all-pg-modal-close-btn" onClick={onClose}> &times;</span>
                {children}
            </div>
        </div>
    );
};

export default PopupAllPgForm;
