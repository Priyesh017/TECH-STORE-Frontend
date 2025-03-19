import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";
import "./Order.scss";

import CartItem from "../Cart/CartItem/CartItem";

const Order = () => {
  const { cartItems, cartSubTotal, handleClearCart } = useContext(Context);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    handleClearCart(); // Clear the cart before placing the order

    // Check if address exists in local storage
    const storedAddress = localStorage.getItem("addressDetails");

    if (storedAddress) {
      // If address exists, navigate to confirmation page
      console.log("Order placed successfully");
      navigate("/confirmation");
    } else {
      // If no address, navigate to address page
      navigate("/address");
    }
  };

  const handleBackToHome = () => {
    navigate("/"); // Adjust the path to your shop page as needed
  };

  return (
    <div className="order-page">
      <h1>Order Summary</h1>
      {!!cartItems?.length ? (
        <>
          <CartItem />
          <div className="cart-footer">
            <div className="subtotal">
              <span className="text">Total Price:</span>
              <span className="text">&#8377;{cartSubTotal}</span>
            </div>
          </div>
          <button className="order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="order-btn" onClick={handleBackToHome}>
            Back To Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
