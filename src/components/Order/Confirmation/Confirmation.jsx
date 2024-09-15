import React from "react";
import { useNavigate } from "react-router-dom";
import "./Confirmation.scss";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-page">
      <h1>Order Confirmed!</h1>
      <p>
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default Confirmation;
