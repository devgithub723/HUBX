// // // // EditProfileModal.js
// // // import React, { useEffect, useState } from 'react';
// // // import axios from '../axios';
// // // import styles from './Chat.module.css'; // reuse modal styles

// // // function EditProfileModal({ isOpen, onClose, userId }) {
// // //   const [editName, setEditName] = useState('');
// // //   const [editEmail, setEditEmail] = useState('');
// // //   const [editMobile, setEditMobile] = useState('');

// // //   useEffect(() => {
// // //     const fetchCurrentUser = async () => {
// // //       if (!isOpen || !userId) return;
// // //       try {
// // //         const res = await axios.get(`/auth/find-id/${userId}`);
// // //         const { name, email, mobile } = res.data;
// // //         setEditName(name);
// // //         setEditEmail(email);
// // //         setEditMobile(mobile);
// // //       } catch (err) {
// // //         console.error('Error fetching profile:', err);
// // //       }
// // //     };
// // //     fetchCurrentUser();
// // //   }, [isOpen, userId]);

// // //   const handleSave = async () => {
// // //     try {
// // //       await axios.put(`/auth/update/${userId}`, {
// // //         name: editName,
// // //         email: editEmail,
// // //         mobile: editMobile
// // //       });
// // //       alert('Profile updated successfully!');
// // //       onClose();
// // //     } catch (err) {
// // //       console.error('Error updating profile:', err);
// // //       alert('Failed to update profile.');
// // //     }
// // //   };

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className={styles.modalOverlay} onClick={onClose}>
// // //       <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// // //         <h2>Edit Profile</h2>

// // //         <label>Name:</label>
// // //         <input
// // //           type="text"
// // //           value={editName}
// // //           onChange={(e) => setEditName(e.target.value)}
// // //           style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
// // //         />

// // //         <label>Email:</label>
// // //         <input
// // //           type="email"
// // //           value={editEmail}
// // //           onChange={(e) => setEditEmail(e.target.value)}
// // //           style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
// // //         />

// // //         <label>Mobile:</label>
// // //         <input
// // //           type="text"
// // //           value={editMobile}
// // //           onChange={(e) => setEditMobile(e.target.value)}
// // //           style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
// // //         />

// // //         <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
// // //           <button onClick={onClose} style={{ padding: '8px 12px' }}>Cancel</button>
// // //           <button onClick={handleSave} style={{ padding: '8px 12px', backgroundColor: '#2ecc71', color: 'white', border: 'none' }}>
// // //             Save
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default EditProfileModal;

// // import React, { useEffect, useState } from 'react';
// // import axios from '../axios'; // adjust if needed
// // import styles from './Chat.module.css';

// // function EditProfileModal({ onClose, userId }) {
// //   const [editName, setEditName] = useState('');
// //   const [editEmail, setEditEmail] = useState('');
// //   const [editMobile, setEditMobile] = useState('');

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await axios.get(`/auth/profile/${userId}`);
// //         setEditName(res.data.name);
// //         setEditEmail(res.data.email);
// //         setEditMobile(res.data.mobile);
// //       } catch (err) {
// //         console.error('Failed to fetch user:', err);
// //       }
// //     };
// //     fetchUser();
// //   }, [userId]);

// //   const handleSave = async () => {
// //     try {
// //       await axios.put(`/auth/profile/${userId}`, {
// //         name: editName,
// //         email: editEmail,
// //         mobile: editMobile
// //       });
// //       alert('Profile updated successfully!');
// //       onClose();
// //     } catch (err) {
// //       console.error('Update failed:', err);
// //       alert('Error updating profile');
// //     }
// //   };
// //   useEffect(() => {
// //   console.log("EditProfileModal mounted");
// // }, []);


// //   return (
    
// //     <div className={styles.modalOverlay} onClick={onClose}>
      
// //       <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// //         <h2>Edit Profile</h2>
// //         <label>Name:</label>
// //         <input
// //           type="text"
// //           value={editName}
// //           onChange={(e) => setEditName(e.target.value)}
// //         />
// //         <label>Email:</label>
// //         <input
// //           type="email"
// //           value={editEmail}
// //           onChange={(e) => setEditEmail(e.target.value)}
// //         />
// //         <label>Mobile:</label>
// //         <input
// //           type="text"
// //           value={editMobile}
// //           onChange={(e) => setEditMobile(e.target.value)}
// //         />
// //         <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
// //           <button onClick={handleSave}>Save</button>
// //           <button onClick={onClose} style={{ backgroundColor: '#ccc' }}>Cancel</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default EditProfileModal;

// // EditProfileModal.jsx
// import React, { useEffect, useState } from 'react';
// import axios from '../axios';
// import styles from './EditProfileModal.module.css';

// function EditProfileModal({ onClose, userId }) {
//   const [editName, setEditName] = useState('');
//   const [editEmail, setEditEmail] = useState('');
//   const [editMobile, setEditMobile] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`/auth/user/${userId}`);
//         setEditName(res.data.name);
//         setEditEmail(res.data.email);
//         setEditMobile(res.data.mobile);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         alert('Failed to fetch profile');
//         onClose();
//       }
//     };
//     if (userId) fetchProfile();
//   }, [userId, onClose]);

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`/auth/update/${userId}`, {
//         name: editName,
//         email: editEmail,
//         mobile: editMobile
//       });
//       alert('Profile updated successfully');
//       onClose();
//     } catch (err) {
//       console.error('Update failed:', err);
//       alert('Failed to update profile');
//     }
//   };

//   if (loading) return <div className={styles.modal}>Loading...</div>;

//   return (
//     <div className={styles.modalOverlay} onClick={onClose}>
//       <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <h2>Edit Your Profile</h2>

//         <label>Name:</label>
//         <input
//           type="text"
//           value={editName}
//           onChange={(e) => setEditName(e.target.value)}
//         />

//         <label>Email:</label>
//         <input
//           type="email"
//           value={editEmail}
//           onChange={(e) => setEditEmail(e.target.value)}
//         />

//         <label>Mobile:</label>
//         <input
//           type="text"
//           value={editMobile}
//           onChange={(e) => setEditMobile(e.target.value)}
//         />

//         <div className={styles.modalActions}>
//           <button onClick={handleUpdate}>Save</button>
//           <button onClick={onClose} className={styles.cancelBtn}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditProfileModal;


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
