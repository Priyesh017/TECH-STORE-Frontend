import React, { useState, useEffect } from "react";
import "./EditProfile.scss";

const EditProfile = ({ user, onSave, onCancel }) => {
  const [editData, setEditData] = useState({ username: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEditData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    // Basic validation
    if (!editData.username || !editData.email) {
      setMessage("Please fill in all fields.");
      return;
    }

    const reqOptions = {
      method: "PUT", // or "PATCH" based on API requirements
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`, // Include JWT if authentication is required
      },
      body: JSON.stringify(editData),
    };

    try {
      // Assuming the correct endpoint is /api/users/{userId}
      const response = await fetch(
        `http://127.0.0.1:1337/api/users/${user.id}`,
        reqOptions
      );

      // Check if the response is okay (status 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          setMessage("User not found. Please check your user ID.");
        } else {
          setMessage(errorData.error?.message || "An error occurred. Please try again.");
        }
        return;
      }

      const data = await response.json();
      onSave(data); // Pass the updated user data to the parent component
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="edit-popup">
      <form onSubmit={handleSave}>
        <h3>Edit Profile</h3>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={editData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProfile;
