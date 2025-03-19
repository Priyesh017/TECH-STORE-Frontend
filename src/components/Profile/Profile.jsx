import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaSignOutAlt, FaEdit } from "react-icons/fa"; // Import the icons
import EditProfile from "./EditProfile/EditProfile"; // Import EditProfile component
import { Context } from "../../utils/context";
import "./Profile.scss";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null); // State to store address details
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn, logout } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from cookies
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Retrieve address data from local storage using the logged-in user's email as key
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      const storedAddresses = localStorage.getItem("addressDetails");
      if (storedAddresses) {
        const addresses = JSON.parse(storedAddresses);
        if (addresses[email]) {
          setAddress(addresses[email]);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from cookies and local storage
    Cookies.remove("user");
    // localStorage.removeItem("addressDetails");
    setUser(null);
    // setAddress(null);
    logout();
    navigate("/login"); // Redirect to the login page after logout
  };

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
    Cookies.set("user", JSON.stringify(updatedUser));
  };

  const handleEditClick = () => {
    // Navigate to the address editing page
    navigate("/address");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f7f7f7",
          color: "#333",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        No User Data Found
      </div>
    );
  }

  return (
    <div className="body">
      <div className="profile-card">
        {isEditing ? (
          <EditProfile
            user={user}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div className="profile">
            <center>
              <h2>User Profile</h2>
            </center>
            <div className="user-info">
              <div className="avatar">
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
              </div>
              <div className="user-details">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>

            {/* Display address if available */}
            {address ? (
              <div className="user-info">
                <h3>Shipping Address</h3>
                <p>
                  <strong>Name:</strong> {address.name}
                </p>
                <p>
                  <strong>Address:</strong> {address.address}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>State:</strong> {address.state}
                </p>
                <p>
                  <strong>Zip Code:</strong> {address.zipCode}
                </p>
              </div>
            ) : (
              <div className="user-info">
                <h3>No Shipping Address Available</h3>
              </div>
            )}

            <div className="btn">
              <button onClick={handleEditClick} className="edit-button">
                <FaEdit /> Edit Address
              </button>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
