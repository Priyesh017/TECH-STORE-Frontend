// Popup.js
import React from "react";
import "./PopUp.scss"; // Add your styles here

const Popup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
