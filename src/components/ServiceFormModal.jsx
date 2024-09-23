import React from 'react';
import './SeviceFormModal.css';

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="service-modal-overlay">
            <div className="service-modal-content">
                <button className="service-close-button" onClick={onClose} >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
