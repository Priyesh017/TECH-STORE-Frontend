import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // To get the logged-in user's email from cookies
import "./Address.scss";

const Address = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState(""); // To store the logged-in user's email
  const navigate = useNavigate();

  // Load address for the logged-in user from local storage if available
  useEffect(() => {
    // Retrieve the logged-in user's email from cookies
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      setEmail(email);

      // Check if there's an address stored for this user
      const storedAddresses = localStorage.getItem("addressDetails");
      if (storedAddresses) {
        const addresses = JSON.parse(storedAddresses);
        const userAddress = addresses[email];
        if (userAddress) {
          setName(userAddress.name);
          setAddress(userAddress.address);
          setCity(userAddress.city);
          setState(userAddress.state);
          setZipCode(userAddress.zipCode);
        }
      }
    } else {
      // If no user is logged in, redirect to login page or handle as needed
      navigate("/login");
    }
  }, [navigate]);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Store address details with the user's email as key
    const addressDetails = { name, address, city, state, zipCode };
    const storedAddresses = localStorage.getItem("addressDetails");
    const addresses = storedAddresses ? JSON.parse(storedAddresses) : {};
    addresses[email] = addressDetails; // Update the user's address
    localStorage.setItem("addressDetails", JSON.stringify(addresses));
    alert("Address saved successfully!");
    navigate("/order"); // Navigate back to the Order page after saving
  };

  const handleDeleteAddress = () => {
    // Remove the address details for this user from local storage
    const storedAddresses = localStorage.getItem("addressDetails");
    if (storedAddresses) {
      const addresses = JSON.parse(storedAddresses);
      delete addresses[email]; // Delete the user's address
      localStorage.setItem("addressDetails", JSON.stringify(addresses));
    }
    // Clear all input fields
    setName("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    alert("Address deleted successfully!");
  };

  return (
    <div className="address-page">
      <h1>Shipping Address</h1>
      <form className="address-form" onSubmit={handleAddressSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="address-btn">
            Save Address
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={handleDeleteAddress}
          >
            Delete Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
