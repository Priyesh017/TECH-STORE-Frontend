import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaSignOutAlt, FaEdit } from "react-icons/fa"; // Import the icons
import EditProfile from "./EditProfile/EditProfile"; // Import EditProfile component
import "./Profile.scss";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from cookies
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from cookies
    Cookies.remove("user");
    setUser(null);
    navigate("/login"); // Redirect to the login page after logout
  };

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
    Cookies.set("user", JSON.stringify(updatedUser));
  };

  const handleEditClick = () => {
    setIsEditing(true);
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
            <div className="btn">
              {/* <button onClick={handleEditClick} className="edit-button">
                <FaEdit /> Edit Profile
              </button> */}
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
