"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import auth from "../../../utils/auth"; // Import the auth module
import "./Registration.scss";

function Registration() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // New state for password visibility

  const togglePopup = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  const [message, setMessage] = useState(null);

  return (
    <div className="body-r">
      <div className="wrapper-r">
        <form
          onSubmit={(event) =>
            auth.register(event, setMessage, togglePopup, navigate)
          }
        >
          <h2>Register</h2>
          <div className="input-field">
            <input
              type="text"
              id="username"
              name="username"
              className="block"
              required
            />
            <label htmlFor="username" className="block">
              Username
            </label>
          </div>
          <div class="input-field">
            <input
              type="email"
              id="email"
              name="email"
              className="block"
              required
            />
            <label htmlFor="email" className="block">
              Email
            </label>
          </div>
          <div className="input-field">
            <input
              type={isPasswordVisible ? "text" : "password"} // Use text or password based on state
              id="password"
              name="password"
              className="block"
              required
            />
            <label htmlFor="password" className="block">
              Password
            </label>
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <button type="submit">Submit</button>
          <div className="login">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
      <div className={`popup ${isVisible ? "show" : ""}`}>{message}</div>
    </div>
  );
}

export default Registration;
