

import React, { useEffect, useState } from "react";
import axios from "../axios";
import styles from "./EditProfileModal.module.css"; // make sure this file exists

function EditProfileModal({ onClose, userId }) {
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMobile, setEditMobile] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        console.log("Fetching profile for userId:", userId); // Debug line
        const res = await axios.get(`/auth/profile/${userId}`);
        const data = res.data;
        setEditName(data.name);
        setEditEmail(data.email);
        setEditMobile(data.mobile);
      } catch (err) {
        console.error("❌ Failed to fetch profile:", err);
        alert("Failed to fetch profile");
      }
    }
    if (userId) fetchProfile();
  }, [userId]);

 const handleSave = async () => {
  // ✅ Basic validation
  if (!/^\d{10}$/.test(editMobile)) {
    alert('Mobile number must be exactly 10 digits.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
    alert('Please enter a valid email address.');
    return;
  }

  try {
    const res = await axios.put(`/auth/profile/${userId}`, {
      name: editName,
      email: editEmail,
      mobile: editMobile
    });
    alert('Profile updated successfully!');
    onClose(); // close modal
  } catch (err) {
    console.error('❌ Failed to update profile:', err);
    alert('Failed to update profile');
  }
};


  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <label>Name:</label>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />
        <label>Mobile:</label>
        <input
          type="text"
          value={editMobile}
          onChange={(e) => setEditMobile(e.target.value)}
        />
        <div className={styles.buttons}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
