"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import auth from "../../../utils/auth"; // Import the auth function from auth.js
import "./Login.scss";

function Login() {
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

  const handleLogin = (event) => {
    auth.login(event, setMessage, togglePopup, navigate);
  };

  return (
    <div className="body-l">
      <div className="wrapper-l">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="text"
              id="identifier"
              name="identifier"
              className="block"
              required
            />
            <label htmlFor="identifier" className="block">
              Enter your email/username
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
              Enter your password
            </label>
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Log In</button>
          <div className="register">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
      <div className={`popup ${isVisible ? "show" : ""}`}>{message}</div>
    </div>
  );
}

export default Login;
