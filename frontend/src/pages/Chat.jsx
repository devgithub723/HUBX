

// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import socket from '../socket';
// // // // // // // // import axios from '../axios';
// // // // // // // // import styles from './Chat.module.css';

// // // // // // // // function Chat() {
// // // // // // // //   const [message, setMessage] = useState('');
// // // // // // // //   const [chatMessages, setChatMessages] = useState([]);
// // // // // // // //   const [receiverId, setReceiverId] = useState('');
// // // // // // // //   const [currentUserId, setCurrentUserId] = useState(null);
// // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // //   const [searchMobile, setSearchMobile] = useState('');
// // // // // // // //   const [searchedUser, setSearchedUser] = useState(null);
// // // // // // // //   const [receiverInfo, setReceiverInfo] = useState(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const storedId = localStorage.getItem('userId');
// // // // // // // //     setCurrentUserId(storedId);
// // // // // // // //     if (storedId) socket.emit('join', storedId);
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const handleReceive = (data) => {
// // // // // // // //       const isActiveChat =
// // // // // // // //         data.senderId === receiverId || data.receiverId === receiverId;

// // // // // // // //       if (!isActiveChat) return;

// // // // // // // //       const isFromCurrentUser = data.senderId === currentUserId;
// // // // // // // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';

// // // // // // // //       setChatMessages((prev) => [
// // // // // // // //         ...prev,
// // // // // // // //         {
// // // // // // // //           from: displayName,
// // // // // // // //           message: data.message,
// // // // // // // //           file: data.file || null
// // // // // // // //         }
// // // // // // // //       ]);
// // // // // // // //     };

// // // // // // // //     socket.on('receiveMessage', handleReceive);
// // // // // // // //     return () => socket.off('receiveMessage', handleReceive);
// // // // // // // //   }, [receiverId, currentUserId]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchMessages = async () => {
// // // // // // // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // // // // // // //       try {
// // // // // // // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // // // // // // //         const formatted = res.data.map(msg => ({
// // // // // // // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // // // // // // //           message: msg.message,
// // // // // // // //           file: msg.file
// // // // // // // //         }));
// // // // // // // //         setChatMessages(formatted);
// // // // // // // //       } catch (err) {
// // // // // // // //         console.error('Error fetching messages:', err);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchMessages();
// // // // // // // //   }, [receiverId, currentUserId]);

// // // // // // // //   const handleSearch = async () => {
// // // // // // // //     if (!searchMobile.trim()) return;
// // // // // // // //     try {
// // // // // // // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // // // // // // //       setSearchedUser(res.data);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('User not found:', err);
// // // // // // // //       alert('User not found');
// // // // // // // //       setSearchedUser(null);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const sendMessage = async () => {
// // // // // // // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // // // // // // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // // // // // // //     let uploadedFile = null;
// // // // // // // //     if (file) {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append('file', file);
// // // // // // // //       try {
// // // // // // // //         const res = await axios.post('/upload', formData, {
// // // // // // // //           headers: { 'Content-Type': 'multipart/form-data' }
// // // // // // // //         });
// // // // // // // //         uploadedFile = res.data;
// // // // // // // //       } catch (err) {
// // // // // // // //         console.error('File upload failed:', err);
// // // // // // // //         return;
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     socket.emit('privateMessage', {
// // // // // // // //       to: receiverId,
// // // // // // // //       from: currentUserId,
// // // // // // // //       message,
// // // // // // // //       file: uploadedFile
// // // // // // // //     });

// // // // // // // //     setChatMessages((prev) => [
// // // // // // // //       ...prev,
// // // // // // // //       { from: 'You', message, file: uploadedFile }
// // // // // // // //     ]);

// // // // // // // //     setMessage('');
// // // // // // // //     setFile(null);
// // // // // // // //   };

// // // // // // // //   const renderFilePreview = (file) => {
// // // // // // // //     if (!file) return null;
// // // // // // // //     const url = `http://localhost:5000${file.url}`;
// // // // // // // //     if (file.type.startsWith('image/')) {
// // // // // // // //       return <img src={url} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />;
// // // // // // // //     }
// // // // // // // //     if (file.type.startsWith('video/')) {
// // // // // // // //       return (
// // // // // // // //         <video controls style={{ maxWidth: '100%' }}>
// // // // // // // //           <source src={url} type={file.type} />
// // // // // // // //         </video>
// // // // // // // //       );
// // // // // // // //     }
// // // // // // // //     if (file.type === 'application/pdf') {
// // // // // // // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // // // // // // //     }
// // // // // // // //     return <a href={url} download>⬇️ Download File</a>;
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className={styles.container}>
// // // // // // // //       {/* Sidebar */}
// // // // // // // //       <div className={styles.sidebar}>
// // // // // // // //         <input
// // // // // // // //           className={styles.searchInput}
// // // // // // // //           type="text"
// // // // // // // //           placeholder="Enter mobile number"
// // // // // // // //           value={searchMobile}
// // // // // // // //           onChange={(e) => setSearchMobile(e.target.value)}
// // // // // // // //         />
// // // // // // // //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// // // // // // // //         {searchedUser && (
// // // // // // // //           <div
// // // // // // // //             className={styles.userBox}
// // // // // // // //             onClick={() => {
// // // // // // // //               setReceiverId(searchedUser._id);
// // // // // // // //               setReceiverInfo(searchedUser);
// // // // // // // //               setChatMessages([]);
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <div className={styles.userCard}>
// // // // // // // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // // // // // // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // // // // // // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* Chat Area */}
// // // // // // // //       <div className={styles.chatArea}>
// // // // // // // //         <div className={styles.navbar}>
// // // // // // // //           {receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}
// // // // // // // //         </div>

// // // // // // // //         <div className={styles.messagesBox}>
// // // // // // // //           {chatMessages.map((msg, index) => (
// // // // // // // //             <div key={index} className={styles.messageItem}>
// // // // // // // //               <span className={styles.sender}>{msg.from}:</span>
// // // // // // // //               {msg.message && <span>{msg.message}</span>}
// // // // // // // //               <div>{renderFilePreview(msg.file)}</div>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>

// // // // // // // //         <div className={styles.inputArea}>
// // // // // // // //           <input
// // // // // // // //             className={styles.inputText}
// // // // // // // //             type="text"
// // // // // // // //             placeholder="Type a message"
// // // // // // // //             value={message}
// // // // // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // // // // //           />
// // // // // // // //           <input
// // // // // // // //             className={styles.fileInput}
// // // // // // // //             type="file"
// // // // // // // //             onChange={(e) => setFile(e.target.files[0])}
// // // // // // // //           />
// // // // // // // //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default Chat;

// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import socket from '../socket';
// // // // // // import axios from '../axios';
// // // // // // import styles from './Chat.module.css';

// // // // // // function Chat() {
// // // // // //   const [message, setMessage] = useState('');
// // // // // //   const [chatMessages, setChatMessages] = useState([]);
// // // // // //   const [receiverId, setReceiverId] = useState('');
// // // // // //   const [currentUserId, setCurrentUserId] = useState(null);
// // // // // //   const [file, setFile] = useState(null);
// // // // // //   const [searchMobile, setSearchMobile] = useState('');
// // // // // //   const [searchedUser, setSearchedUser] = useState(null);
// // // // // //   const [receiverInfo, setReceiverInfo] = useState(null);

// // // // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // // // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     const storedId = localStorage.getItem('userId');
// // // // // //     setCurrentUserId(storedId);
// // // // // //     if (storedId) socket.emit('join', storedId);
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     const handleReceive = (data) => {
// // // // // //       const isActiveChat =
// // // // // //         data.senderId === receiverId || data.receiverId === receiverId;

// // // // // //       if (!isActiveChat) return;

// // // // // //       const isFromCurrentUser = data.senderId === currentUserId;
// // // // // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';

// // // // // //       setChatMessages((prev) => [
// // // // // //         ...prev,
// // // // // //         {
// // // // // //           from: displayName,
// // // // // //           message: data.message,
// // // // // //           file: data.file || null
// // // // // //         }
// // // // // //       ]);
// // // // // //     };

// // // // // //     socket.on('receiveMessage', handleReceive);
// // // // // //     return () => socket.off('receiveMessage', handleReceive);
// // // // // //   }, [receiverId, currentUserId]);

// // // // // //   useEffect(() => {
// // // // // //     const fetchMessages = async () => {
// // // // // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // // // // //       try {
// // // // // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // // // // //         const formatted = res.data.map(msg => ({
// // // // // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // // // // //           message: msg.message,
// // // // // //           file: msg.file
// // // // // //         }));
// // // // // //         setChatMessages(formatted);
// // // // // //       } catch (err) {
// // // // // //         console.error('Error fetching messages:', err);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchMessages();
// // // // // //   }, [receiverId, currentUserId]);

// // // // // //   const handleSearch = async () => {
// // // // // //     if (!searchMobile.trim()) return;
// // // // // //     try {
// // // // // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // // // // //       setSearchedUser(res.data);
// // // // // //     } catch (err) {
// // // // // //       console.error('User not found:', err);
// // // // // //       alert('User not found');
// // // // // //       setSearchedUser(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const sendMessage = async () => {
// // // // // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // // // // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // // // // //     let uploadedFile = null;
// // // // // //     if (file) {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append('file', file);
// // // // // //       try {
// // // // // //         const res = await axios.post('/upload', formData, {
// // // // // //           headers: { 'Content-Type': 'multipart/form-data' }
// // // // // //         });
// // // // // //         uploadedFile = res.data;
// // // // // //       } catch (err) {
// // // // // //         console.error('File upload failed:', err);
// // // // // //         return;
// // // // // //       }
// // // // // //     }

// // // // // //     socket.emit('privateMessage', {
// // // // // //       to: receiverId,
// // // // // //       from: currentUserId,
// // // // // //       message,
// // // // // //       file: uploadedFile
// // // // // //     });

// // // // // //     setChatMessages((prev) => [
// // // // // //       ...prev,
// // // // // //       { from: 'You', message, file: uploadedFile }
// // // // // //     ]);

// // // // // //     setMessage('');
// // // // // //     setFile(null);
// // // // // //   };

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.removeItem('token');
// // // // // //     localStorage.removeItem('userId');
// // // // // //     navigate('/login');
// // // // // //   };

// // // // // //   const toggleDropdown = () => setShowDropdown(prev => !prev);

// // // // // //   const renderFilePreview = (file) => {
// // // // // //     if (!file) return null;
// // // // // //     const url = `http://localhost:5000${file.url}`;
// // // // // //     if (file.type.startsWith('image/')) {
// // // // // //       return <img src={url} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />;
// // // // // //     }
// // // // // //     if (file.type.startsWith('video/')) {
// // // // // //       return (
// // // // // //         <video controls style={{ maxWidth: '100%' }}>
// // // // // //           <source src={url} type={file.type} />
// // // // // //         </video>
// // // // // //       );
// // // // // //     }
// // // // // //     if (file.type === 'application/pdf') {
// // // // // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // // // // //     }
// // // // // //     return <a href={url} download>⬇️ Download File</a>;
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className={styles.container}>
// // // // // //       {/* Sidebar */}
// // // // // //       <div className={styles.sidebar}>
// // // // // //         <input
// // // // // //           className={styles.searchInput}
// // // // // //           type="text"
// // // // // //           placeholder="Enter mobile number"
// // // // // //           value={searchMobile}
// // // // // //           onChange={(e) => setSearchMobile(e.target.value)}
// // // // // //         />
// // // // // //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// // // // // //         {searchedUser && (
// // // // // //           <div
// // // // // //             className={styles.userBox}
// // // // // //             onClick={() => {
// // // // // //               setReceiverId(searchedUser._id);
// // // // // //               setReceiverInfo(searchedUser);
// // // // // //               setChatMessages([]);
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className={styles.userCard}>
// // // // // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // // // // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // // // // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Chat Area */}
// // // // // //       <div className={styles.chatArea}>
// // // // // //         <div className={styles.navbar}>
// // // // // //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// // // // // //           <div className={styles.profileWrapper}>
// // // // // //             <div className={styles.profileIcon} onClick={toggleDropdown}>👤</div>
// // // // // //             {showDropdown && (
// // // // // //               <div className={styles.dropdown}>
// // // // // //                 <div onClick={() => {
// // // // // //                   setShowProfileModal(true);
// // // // // //                   setShowDropdown(false);
// // // // // //                 }}>Your Profile</div>
// // // // // //                 <div onClick={handleLogout}>Logout</div>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className={styles.messagesBox}>
// // // // // //           {chatMessages.map((msg, index) => (
// // // // // //             <div key={index} className={styles.messageItem}>
// // // // // //               <span className={styles.sender}>{msg.from}:</span>
// // // // // //               {msg.message && <span>{msg.message}</span>}
// // // // // //               <div>{renderFilePreview(msg.file)}</div>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         <div className={styles.inputArea}>
// // // // // //           <input
// // // // // //             className={styles.inputText}
// // // // // //             type="text"
// // // // // //             placeholder="Type a message"
// // // // // //             value={message}
// // // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // // //           />
// // // // // //           <input
// // // // // //             className={styles.fileInput}
// // // // // //             type="file"
// // // // // //             onChange={(e) => setFile(e.target.files[0])}
// // // // // //           />
// // // // // //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Profile Modal */}
// // // // // //       {showProfileModal && (
// // // // // //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// // // // // //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// // // // // //             <h2>Your Profile</h2>
// // // // // //             <p>Implement profile editing here.</p>
// // // // // //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Chat;


// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import socket from '../socket';
// // // // // // import axios from '../axios';
// // // // // // import styles from './Chat.module.css';

// // // // // // function Chat() {
// // // // // //   const [message, setMessage] = useState('');
// // // // // //   const [chatMessages, setChatMessages] = useState([]);
// // // // // //   const [receiverId, setReceiverId] = useState('');
// // // // // //   const [currentUserId, setCurrentUserId] = useState(null);
// // // // // //   const [file, setFile] = useState(null);
// // // // // //   const [searchMobile, setSearchMobile] = useState('');
// // // // // //   const [searchedUser, setSearchedUser] = useState(null);
// // // // // //   const [receiverInfo, setReceiverInfo] = useState(null);

// // // // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // // // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     const storedId = localStorage.getItem('userId');
// // // // // //     setCurrentUserId(storedId);
// // // // // //     if (storedId) socket.emit('join', storedId);
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     const handleReceive = (data) => {
// // // // // //       const isActiveChat =
// // // // // //         data.senderId === receiverId || data.receiverId === receiverId;

// // // // // //       if (!isActiveChat) return;

// // // // // //       const isFromCurrentUser = data.senderId === currentUserId;
// // // // // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';

// // // // // //       setChatMessages((prev) => [
// // // // // //         ...prev,
// // // // // //         {
// // // // // //           from: displayName,
// // // // // //           message: data.message,
// // // // // //           file: data.file || null
// // // // // //         }
// // // // // //       ]);
// // // // // //     };

// // // // // //     socket.on('receiveMessage', handleReceive);
// // // // // //     return () => socket.off('receiveMessage', handleReceive);
// // // // // //   }, [receiverId, currentUserId]);

// // // // // //   useEffect(() => {
// // // // // //     const fetchMessages = async () => {
// // // // // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // // // // //       try {
// // // // // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // // // // //         const formatted = res.data.map(msg => ({
// // // // // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // // // // //           message: msg.message,
// // // // // //           file: msg.file
// // // // // //         }));
// // // // // //         setChatMessages(formatted);
// // // // // //       } catch (err) {
// // // // // //         console.error('Error fetching messages:', err);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchMessages();
// // // // // //   }, [receiverId, currentUserId]);

// // // // // //   const handleSearch = async () => {
// // // // // //     if (!searchMobile.trim()) return;
// // // // // //     try {
// // // // // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // // // // //       setSearchedUser(res.data);
// // // // // //     } catch (err) {
// // // // // //       console.error('User not found:', err);
// // // // // //       alert('User not found');
// // // // // //       setSearchedUser(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const sendMessage = async () => {
// // // // // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // // // // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // // // // //     let uploadedFile = null;
// // // // // //     if (file) {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append('file', file);
// // // // // //       try {
// // // // // //         const res = await axios.post('/upload', formData, {
// // // // // //           headers: { 'Content-Type': 'multipart/form-data' }
// // // // // //         });
// // // // // //         uploadedFile = res.data;
// // // // // //       } catch (err) {
// // // // // //         console.error('File upload failed:', err);
// // // // // //         return;
// // // // // //       }
// // // // // //     }

// // // // // //     socket.emit('privateMessage', {
// // // // // //       to: receiverId,
// // // // // //       from: currentUserId,
// // // // // //       message,
// // // // // //       file: uploadedFile
// // // // // //     });

// // // // // //     setChatMessages((prev) => [
// // // // // //       ...prev,
// // // // // //       { from: 'You', message, file: uploadedFile }
// // // // // //     ]);

// // // // // //     setMessage('');
// // // // // //     setFile(null);
// // // // // //   };

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.removeItem('token');
// // // // // //     localStorage.removeItem('userId');
// // // // // //     navigate('/login');
// // // // // //   };

// // // // // //   const toggleDropdown = () => setShowDropdown(prev => !prev);

// // // // // //   const renderFilePreview = (file) => {
// // // // // //     if (!file) return null;
// // // // // //     const url = `http://localhost:5000${file.url}`;
// // // // // //     if (file.type.startsWith('image/')) {
// // // // // //       return <img src={url} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />;
// // // // // //     }
// // // // // //     if (file.type.startsWith('video/')) {
// // // // // //       return (
// // // // // //         <video controls style={{ maxWidth: '100%' }}>
// // // // // //           <source src={url} type={file.type} />
// // // // // //         </video>
// // // // // //       );
// // // // // //     }
// // // // // //     if (file.type === 'application/pdf') {
// // // // // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // // // // //     }
// // // // // //     return <a href={url} download>⬇️ Download File</a>;
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className={styles.container}>
// // // // // //       {/* Sidebar */}
// // // // // //       <div className={styles.sidebar}>
// // // // // //         <input
// // // // // //           className={styles.searchInput}
// // // // // //           type="text"
// // // // // //           placeholder="Enter mobile number"
// // // // // //           value={searchMobile}
// // // // // //           onChange={(e) => setSearchMobile(e.target.value)}
// // // // // //         />
// // // // // //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// // // // // //         {searchedUser && (
// // // // // //           <div
// // // // // //             className={styles.userBox}
// // // // // //             onClick={() => {
// // // // // //               setReceiverId(searchedUser._id);
// // // // // //               setReceiverInfo(searchedUser);
// // // // // //               setChatMessages([]);
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className={styles.userCard}>
// // // // // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // // // // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // // // // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Chat Area */}
// // // // // //       <div className={styles.chatArea}>
// // // // // //         <div className={styles.navbar}>
// // // // // //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// // // // // //           <div className={styles.profileContainer}>
// // // // // //             <span className={styles.avatarIcon} onClick={toggleDropdown}>👤</span>
// // // // // //             {showDropdown && (
// // // // // //               <div className={styles.dropdownMenu}>
// // // // // //                 <div onClick={() => {
// // // // // //                   setShowProfileModal(true);
// // // // // //                   setShowDropdown(false);
// // // // // //                 }}>Your Profile</div>
// // // // // //                 <div onClick={handleLogout}>Logout</div>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className={styles.messagesBox}>
// // // // // //           {chatMessages.map((msg, index) => (
// // // // // //             <div key={index} className={styles.messageItem}>
// // // // // //               <span className={styles.sender}>{msg.from}:</span>
// // // // // //               {msg.message && <span>{msg.message}</span>}
// // // // // //               <div>{renderFilePreview(msg.file)}</div>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         <div className={styles.inputArea}>
// // // // // //           <input
// // // // // //             className={styles.inputText}
// // // // // //             type="text"
// // // // // //             placeholder="Type a message"
// // // // // //             value={message}
// // // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // // //           />
// // // // // //           <input
// // // // // //             className={styles.fileInput}
// // // // // //             type="file"
// // // // // //             onChange={(e) => setFile(e.target.files[0])}
// // // // // //           />
// // // // // //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Profile Modal */}
// // // // // //       {showProfileModal && (
// // // // // //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// // // // // //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// // // // // //             <h2>Your Profile</h2>
// // // // // //             <p>Implement profile editing here.</p>
// // // // // //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Chat;


// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import socket from '../socket';
// // // // // import axios from '../axios';
// // // // // import styles from './Chat.module.css';

// // // // // function Chat() {
// // // // //   const [message, setMessage] = useState('');
// // // // //   const [chatMessages, setChatMessages] = useState([]);
// // // // //   const [receiverId, setReceiverId] = useState('');
// // // // //   const [currentUserId, setCurrentUserId] = useState(null);
// // // // //   const [file, setFile] = useState(null);
// // // // //   const [searchMobile, setSearchMobile] = useState('');
// // // // //   const [searchedUser, setSearchedUser] = useState(null);
// // // // //   const [receiverInfo, setReceiverInfo] = useState(null);

// // // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const storedId = localStorage.getItem('userId');
// // // // //     setCurrentUserId(storedId);
// // // // //     if (storedId) socket.emit('join', storedId);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const handleReceive = (data) => {
// // // // //       const isActiveChat =
// // // // //         data.senderId === receiverId || data.receiverId === receiverId;

// // // // //       if (!isActiveChat) return;

// // // // //       const isFromCurrentUser = data.senderId === currentUserId;
// // // // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';

// // // // //       setChatMessages((prev) => [
// // // // //         ...prev,
// // // // //         {
// // // // //           from: displayName,
// // // // //           message: data.message,
// // // // //           file: data.file || null
// // // // //         }
// // // // //       ]);
// // // // //     };

// // // // //     socket.on('receiveMessage', handleReceive);
// // // // //     return () => socket.off('receiveMessage', handleReceive);
// // // // //   }, [receiverId, currentUserId]);

// // // // //   useEffect(() => {
// // // // //     const fetchMessages = async () => {
// // // // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // // // //       try {
// // // // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // // // //         const formatted = res.data.map(msg => ({
// // // // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // // // //           message: msg.message,
// // // // //           file: msg.file
// // // // //         }));
// // // // //         setChatMessages(formatted);
// // // // //       } catch (err) {
// // // // //         console.error('Error fetching messages:', err);
// // // // //       }
// // // // //     };
// // // // //     fetchMessages();
// // // // //   }, [receiverId, currentUserId]);

// // // // //   const handleSearch = async () => {
// // // // //     if (!searchMobile.trim()) return;
// // // // //     try {
// // // // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // // // //       setSearchedUser(res.data);
// // // // //     } catch (err) {
// // // // //       console.error('User not found:', err);
// // // // //       alert('User not found');
// // // // //       setSearchedUser(null);
// // // // //     }
// // // // //   };

// // // // //   const sendMessage = async () => {
// // // // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // // // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // // // //     let uploadedFile = null;
// // // // //     if (file) {
// // // // //       const formData = new FormData();
// // // // //       formData.append('file', file);
// // // // //       try {
// // // // //         const res = await axios.post('/upload', formData, {
// // // // //           headers: { 'Content-Type': 'multipart/form-data' }
// // // // //         });
// // // // //         uploadedFile = res.data;
// // // // //       } catch (err) {
// // // // //         console.error('File upload failed:', err);
// // // // //         return;
// // // // //       }
// // // // //     }

// // // // //     socket.emit('privateMessage', {
// // // // //       to: receiverId,
// // // // //       from: currentUserId,
// // // // //       message,
// // // // //       file: uploadedFile
// // // // //     });

// // // // //     setChatMessages((prev) => [
// // // // //       ...prev,
// // // // //       { from: 'You', message, file: uploadedFile }
// // // // //     ]);

// // // // //     setMessage('');
// // // // //     setFile(null);
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     localStorage.removeItem('token');
// // // // //     localStorage.removeItem('userId');
// // // // //     navigate('/login');
// // // // //   };

// // // // //   const toggleDropdown = () => setShowDropdown(prev => !prev);

// // // // //   const renderFilePreview = (file) => {
// // // // //     if (!file) return null;
// // // // //     const url = `http://localhost:5000${file.url}`;
// // // // //     if (file.type.startsWith('image/')) {
// // // // //       return <img src={url} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />;
// // // // //     }
// // // // //     if (file.type.startsWith('video/')) {
// // // // //       return (
// // // // //         <video controls style={{ maxWidth: '100%' }}>
// // // // //           <source src={url} type={file.type} />
// // // // //         </video>
// // // // //       );
// // // // //     }
// // // // //     if (file.type === 'application/pdf') {
// // // // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // // // //     }
// // // // //     return <a href={url} download>⬇️ Download File</a>;
// // // // //   };

// // // // //   return (
// // // // //     <div className={styles.container}>
// // // // //       {/* Sidebar */}
// // // // //       <div className={styles.sidebar}>
// // // // //         <input
// // // // //           className={styles.searchInput}
// // // // //           type="text"
// // // // //           placeholder="Enter mobile number"
// // // // //           value={searchMobile}
// // // // //           onChange={(e) => setSearchMobile(e.target.value)}
// // // // //         />
// // // // //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// // // // //         {searchedUser && (
// // // // //           <div
// // // // //             className={styles.userBox}
// // // // //             onClick={() => {
// // // // //               setReceiverId(searchedUser._id);
// // // // //               setReceiverInfo(searchedUser);
// // // // //               setChatMessages([]);
// // // // //             }}
// // // // //           >
// // // // //             <div className={styles.userCard}>
// // // // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // // // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // // // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Chat Area */}
// // // // //       <div className={styles.chatArea}>
// // // // //         <div className={styles.navbar}>
// // // // //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// // // // //           <div className={styles.profileContainer}>
// // // // //             <span className={styles.avatarIcon} onClick={toggleDropdown}>👤</span>
// // // // //             {showDropdown && (
// // // // //               <div className={styles.dropdownMenu}>
// // // // //                 <div onClick={() => {
// // // // //                   setShowProfileModal(true);
// // // // //                   setShowDropdown(false);
// // // // //                 }}>Your Profile</div>
// // // // //                 <div onClick={handleLogout}>Logout</div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className={styles.messagesBox}>
// // // // //           {chatMessages.map((msg, index) => (
// // // // //             <div key={index} className={styles.messageItem}>
// // // // //               <span className={styles.sender}>{msg.from}:</span>
// // // // //               {msg.message && <span>{msg.message}</span>}
// // // // //               <div>{renderFilePreview(msg.file)}</div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* Input Area */}
// // // // //         <div className={styles.inputArea}>
// // // // //           <label className={styles.fileInputWrapper}>
// // // // //             <input
// // // // //               type="file"
// // // // //               className={styles.fileInput}
// // // // //               onChange={(e) => setFile(e.target.files[0])}
// // // // //             />
// // // // //             📎
// // // // //           </label>

// // // // //           <input
// // // // //             className={styles.inputText}
// // // // //             type="text"
// // // // //             placeholder="Type a message"
// // // // //             value={message}
// // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // //           />

// // // // //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Profile Modal */}
// // // // //       {showProfileModal && (
// // // // //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// // // // //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// // // // //             <h2>Your Profile</h2>
// // // // //             <p>Implement profile editing here.</p>
// // // // //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Chat;

// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import socket from '../socket';
// // // // // import axios from '../axios';
// // // // // import styles from './Chat.module.css';

// // // // // function Chat() {
// // // // //   const [message, setMessage] = useState('');
// // // // //   const [chatMessages, setChatMessages] = useState([]);
// // // // //   const [receiverId, setReceiverId] = useState('');
// // // // //   const [currentUserId, setCurrentUserId] = useState(null);
// // // // //   const [file, setFile] = useState(null);
// // // // //   const [searchMobile, setSearchMobile] = useState('');
// // // // //   const [searchedUser, setSearchedUser] = useState(null);
// // // // //   const [receiverInfo, setReceiverInfo] = useState(null);

// // // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const storedId = localStorage.getItem('userId');
// // // // //     setCurrentUserId(storedId);
// // // // //     if (storedId) socket.emit('join', storedId);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const handleReceive = (data) => {
// // // // //       const isActiveChat =
// // // // //         data.senderId === receiverId || data.receiverId === receiverId;

// // // // //       if (!isActiveChat) return;

// // // // //       const isFromCurrentUser = data.senderId === currentUserId;
// // // // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';

// // // // //       setChatMessages((prev) => [
// // // // //         ...prev,
// // // // //         {
// // // // //           from: displayName,
// // // // //           message: data.message,
// // // // //           file: data.file || null
// // // // //         }
// // // // //       ]);
// // // // //     };

// // // // //     socket.on('receiveMessage', handleReceive);
// // // // //     return () => socket.off('receiveMessage', handleReceive);
// // // // //   }, [receiverId, currentUserId]);

// // // // //   useEffect(() => {
// // // // //     const fetchMessages = async () => {
// // // // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // // // //       try {
// // // // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // // // //         const formatted = res.data.map(msg => ({
// // // // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // // // //           message: msg.message,
// // // // //           file: msg.file
// // // // //         }));
// // // // //         setChatMessages(formatted);
// // // // //       } catch (err) {
// // // // //         console.error('Error fetching messages:', err);
// // // // //       }
// // // // //     };
// // // // //     fetchMessages();
// // // // //   }, [receiverId, currentUserId]);

// // // // //   const handleSearch = async () => {
// // // // //     if (!searchMobile.trim()) return;
// // // // //     try {
// // // // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // // // //       setSearchedUser(res.data);
// // // // //     } catch (err) {
// // // // //       console.error('User not found:', err);
// // // // //       alert('User not found');
// // // // //       setSearchedUser(null);
// // // // //     }
// // // // //   };

// // // // //   const sendMessage = async () => {
// // // // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // // // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // // // //     let uploadedFile = null;
// // // // //     if (file) {
// // // // //       const formData = new FormData();
// // // // //       formData.append('file', file);
// // // // //       try {
// // // // //         const res = await axios.post('/upload', formData, {
// // // // //           headers: { 'Content-Type': 'multipart/form-data' }
// // // // //         });
// // // // //         uploadedFile = res.data;
// // // // //       } catch (err) {
// // // // //         console.error('File upload failed:', err);
// // // // //         return;
// // // // //       }
// // // // //     }

// // // // //     socket.emit('privateMessage', {
// // // // //       to: receiverId,
// // // // //       from: currentUserId,
// // // // //       message,
// // // // //       file: uploadedFile
// // // // //     });

// // // // //     setChatMessages((prev) => [
// // // // //       ...prev,
// // // // //       { from: 'You', message, file: uploadedFile }
// // // // //     ]);

// // // // //     setMessage('');
// // // // //     setFile(null);
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     localStorage.removeItem('token');
// // // // //     localStorage.removeItem('userId');
// // // // //     navigate('/login');
// // // // //   };

// // // // //   const renderFilePreview = (file) => {
// // // // //     if (!file) return null;
// // // // //     const url = `http://localhost:5000${file.url}`;
// // // // //     if (file.type.startsWith('image/')) {
// // // // //       return <img src={url} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />;
// // // // //     }
// // // // //     if (file.type.startsWith('video/')) {
// // // // //       return (
// // // // //         <video controls style={{ maxWidth: '100%' }}>
// // // // //           <source src={url} type={file.type} />
// // // // //         </video>
// // // // //       );
// // // // //     }
// // // // //     if (file.type === 'application/pdf') {
// // // // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // // // //     }
// // // // //     return <a href={url} download>⬇️ Download File</a>;
// // // // //   };

// // // // //   return (
// // // // //     <div className={styles.container}>
// // // // //       {/* Sidebar */}
// // // // //       <div className={styles.sidebar}>
// // // // //         <input
// // // // //           className={styles.searchInput}
// // // // //           type="text"
// // // // //           placeholder="Enter mobile number"
// // // // //           value={searchMobile}
// // // // //           onChange={(e) => setSearchMobile(e.target.value)}
// // // // //         />
// // // // //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// // // // //         {searchedUser && (
// // // // //           <div
// // // // //             className={styles.userBox}
// // // // //             onClick={() => {
// // // // //               setReceiverId(searchedUser._id);
// // // // //               setReceiverInfo(searchedUser);
// // // // //               setChatMessages([]);
// // // // //             }}
// // // // //           >
// // // // //             <div className={styles.userCard}>
// // // // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // // // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // // // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Chat Area */}
// // // // //       <div className={styles.chatArea}>
// // // // //         <div className={styles.navbar}>
// // // // //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
          
// // // // //           {/* Right-side Dropdown */}
// // // // //           <div style={{ position: 'relative' }}>
// // // // //             <button
// // // // //               style={{
// // // // //                 marginLeft: '10px',
// // // // //                 backgroundColor: '#f0f0f0',
// // // // //                 border: '1px solid #ccc',
// // // // //                 padding: '4px 8px',
// // // // //                 cursor: 'pointer',
// // // // //                 borderRadius: '4px'
// // // // //               }}
// // // // //               onClick={() => setShowDropdown(!showDropdown)}
// // // // //             >
// // // // //               Options
// // // // //             </button>

// // // // //             {showDropdown && (
// // // // //               <div
// // // // //                 style={{
// // // // //                   position: 'absolute',
// // // // //                   top: '30px',
// // // // //                   right: 0,
// // // // //                   backgroundColor: 'white',
// // // // //                   border: '1px solid #ccc',
// // // // //                   width: '120px',
// // // // //                   zIndex: 10
// // // // //                 }}
// // // // //               >
// // // // //                 <div
// // // // //                   style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
// // // // //                   onClick={() => {
// // // // //                     setShowProfileModal(true);
// // // // //                     setShowDropdown(false);
// // // // //                   }}
// // // // //                 >
// // // // //                   Your Profile
// // // // //                 </div>
// // // // //                 <div
// // // // //                   style={{ padding: '8px', cursor: 'pointer' }}
// // // // //                   onClick={handleLogout}
// // // // //                 >
// // // // //                   Logout
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className={styles.messagesBox}>
// // // // // //           {chatMessages.map((msg, index) => (
// // // // // //             <div key={index} className={styles.messageItem}>
// // // // //               <span className={styles.sender}>{msg.from}:</span>
// // // // //               {msg.message && <span>{msg.message}</span>}
// // // // //               <div>{renderFilePreview(msg.file)}</div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* Input Area */}
// // // // //         <div className={styles.inputArea}>
// // // // //           <label className={styles.fileInputWrapper}>
// // // // //             <input
// // // // //               type="file"
// // // // //               className={styles.fileInput}
// // // // //               onChange={(e) => setFile(e.target.files[0])}
// // // // //             />
// // // // //             📎
// // // // //           </label>

// // // // //           <input
// // // // //             className={styles.inputText}
// // // // //             type="text"
// // // // //             placeholder="Type a message"
// // // // //             value={message}
// // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // //           />

// // // // //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Profile Modal */}
// // // // //       {showProfileModal && (
// // // // //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// // // // //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// // // // //             <h2>Your Profile</h2>
// // // // //             <p>Implement profile editing here.</p>
// // // // //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Chat;

// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import socket from '../socket';
// // // // // import axios from '../axios';
// // // // // import './Chat.module.css';

// // // // // function Chat() {
// // // // //   const [message, setMessage] = useState('');
// // // // //   const [chatMessages, setChatMessages] = useState([]);
// // // // //   const [receiverId, setReceiverId] = useState('');
// // // // //   const [currentUserId, setCurrentUserId] = useState(null);
// // // // //   const [file, setFile] = useState(null);
// // // // //   const [searchMobile, setSearchMobile] = useState('');
// // // // //   const [searchedUser, setSearchedUser] = useState(null);
// // // // //   const [receiverInfo, setReceiverInfo] = useState(null);

// // // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const storedId = localStorage.getItem('userId');
// // // // //     setCurrentUserId(storedId);
// // // // //     if (storedId) socket.emit('join', storedId);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const handleReceive = (data) => {
// // // // //       const isActiveChat =
// // // // //         data.senderId === receiverId || data.receiverId === receiverId;

// // // // //       if (!isActiveChat) return;

// // // // //       const isFromCurrentUser = data.senderId === currentUserId;
// // // // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';

// // // // //       setChatMessages((prev) => [
// // // // //         ...prev,
// // // // //         {
// // // // //           from: displayName,
// // // // //           message: data.message,
// // // // //           file: data.file || null
// // // // //         }
// // // // //       ]);
// // // // //     };

// // // // //     socket.on('receiveMessage', handleReceive);
// // // // //     return () => socket.off('receiveMessage', handleReceive);
// // // // //   }, [receiverId, currentUserId]);

// // // // //   useEffect(() => {
// // // // //     const fetchMessages = async () => {
// // // // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // // // //       try {
// // // // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // // // //         const formatted = res.data.map(msg => ({
// // // // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // // // //           message: msg.message,
// // // // //           file: msg.file
// // // // //         }));
// // // // //         setChatMessages(formatted);
// // // // //       } catch (err) {
// // // // //         console.error('Error fetching messages:', err);
// // // // //       }
// // // // //     };
// // // // //     fetchMessages();
// // // // //   }, [receiverId, currentUserId]);

// // // // //   const handleSearch = async () => {
// // // // //     if (!searchMobile.trim()) return;
// // // // //     try {
// // // // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // // // //       setSearchedUser(res.data);
// // // // //     } catch (err) {
// // // // //       console.error('User not found:', err);
// // // // //       alert('User not found');
// // // // //       setSearchedUser(null);
// // // // //     }
// // // // //   };

// // // // //   const sendMessage = async () => {
// // // // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // // // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // // // //     let uploadedFile = null;
// // // // //     if (file) {
// // // // //       const formData = new FormData();
// // // // //       formData.append('file', file);
// // // // //       try {
// // // // //         const res = await axios.post('/upload', formData, {
// // // // //           headers: { 'Content-Type': 'multipart/form-data' }
// // // // //         });
// // // // //         uploadedFile = res.data;
// // // // //       } catch (err) {
// // // // //         console.error('File upload failed:', err);
// // // // //         return;
// // // // //       }
// // // // //     }

// // // // //     socket.emit('privateMessage', {
// // // // //       to: receiverId,
// // // // //       from: currentUserId,
// // // // //       message,
// // // // //       file: uploadedFile
// // // // //     });

// // // // //     setChatMessages((prev) => [
// // // // //       ...prev,
// // // // //       { from: 'You', message, file: uploadedFile }
// // // // //     ]);

// // // // //     setMessage('');
// // // // //     setFile(null);
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     localStorage.removeItem('token');
// // // // //     localStorage.removeItem('userId');
// // // // //     navigate('/login');
// // // // //   };

// // // // //   const renderFilePreview = (file) => {
// // // // //     if (!file) return null;
// // // // //     const url = `http://localhost:5000${file.url}`;
// // // // //     if (file.type.startsWith('image/')) {
// // // // //       return <img src={url} alt="img" className="chat-image" />;
// // // // //     }
// // // // //     if (file.type.startsWith('video/')) {
// // // // //       return (
// // // // //         <video controls className="chat-video">
// // // // //           <source src={url} type={file.type} />
// // // // //         </video>
// // // // //       );
// // // // //     }
// // // // //     if (file.type === 'application/pdf') {
// // // // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // // // //     }
// // // // //     return <a href={url} download>⬇️ Download File</a>;
// // // // //   };

// // // // //   return (
// // // // //     <div className="chat-container">
// // // // //       <div className="chat-sidebar">
// // // // //         <input
// // // // //           className="search-input"
// // // // //           type="text"
// // // // //           placeholder="Enter mobile number"
// // // // //           value={searchMobile}
// // // // //           onChange={(e) => setSearchMobile(e.target.value)}
// // // // //         />
// // // // //         <button className="search-button" onClick={handleSearch}>Search</button>

// // // // //         {searchedUser && (
// // // // //           <div
// // // // //             className="user-box"
// // // // //             onClick={() => {
// // // // //               setReceiverId(searchedUser._id);
// // // // //               setReceiverInfo(searchedUser);
// // // // //               setChatMessages([]);
// // // // //             }}
// // // // //           >
// // // // //             <div className="user-info">
// // // // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // // // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // // // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       <div className="chat-main">
// // // // //         <div className="chat-navbar">
// // // // //           <span className="chat-title">{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// // // // //           <div className="dropdown-wrapper">
// // // // //             <button className="dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
// // // // //               Options
// // // // //             </button>
// // // // //             {showDropdown && (
// // // // //               <div className="dropdown-menu">
// // // // //                 <div onClick={() => {
// // // // //                   setShowProfileModal(true);
// // // // //                   setShowDropdown(false);
// // // // //                 }}>Your Profile</div>
// // // // //                 <div onClick={handleLogout}>Logout</div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="messages-box">
// // // // //           {chatMessages.map((msg, index) => (
// // // // //             <div key={index} className="message-item">
// // // // //               <span className="message-sender">{msg.from}:</span>
// // // // //               {msg.message && <span>{msg.message}</span>}
// // // // //               <div>{renderFilePreview(msg.file)}</div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="input-area">
// // // // //           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
// // // // //           <input
// // // // //             className="message-input"
// // // // //             type="text"
// // // // //             placeholder="Type a message"
// // // // //             value={message}
// // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // //           />
// // // // //           <button className="send-button" onClick={sendMessage}>Send</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {showProfileModal && (
// // // // //         <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
// // // // //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// // // // //             <h2>Your Profile</h2>
// // // // //             <p>Implement profile editing here.</p>
// // // // //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Chat;

// // // // import React, { useEffect, useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import socket from '../socket';
// // // // import axios from '../axios';
// // // // import styles from './Chat.module.css';

// // // // function Chat() {
// // // //   const [message, setMessage] = useState('');
// // // //   const [chatMessages, setChatMessages] = useState([]);
// // // //   const [receiverId, setReceiverId] = useState('');
// // // //   const [currentUserId, setCurrentUserId] = useState(null);
// // // //   const [file, setFile] = useState(null);
// // // //   const [searchMobile, setSearchMobile] = useState('');
// // // //   const [searchedUser, setSearchedUser] = useState(null);
// // // //   const [receiverInfo, setReceiverInfo] = useState(null);
// // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     const storedId = localStorage.getItem('userId');
// // // //     setCurrentUserId(storedId);
// // // //     if (storedId) socket.emit('join', storedId);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const handleReceive = (data) => {
// // // //       const isActiveChat =
// // // //         data.senderId === receiverId || data.receiverId === receiverId;
// // // //       if (!isActiveChat) return;
// // // //       const isFromCurrentUser = data.senderId === currentUserId;
// // // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';
// // // //       setChatMessages((prev) => [
// // // //         ...prev,
// // // //         {
// // // //           from: displayName,
// // // //           message: data.message,
// // // //           file: data.file || null
// // // //         }
// // // //       ]);
// // // //     };
// // // //     socket.on('receiveMessage', handleReceive);
// // // //     return () => socket.off('receiveMessage', handleReceive);
// // // //   }, [receiverId, currentUserId]);

// // // //   useEffect(() => {
// // // //     const fetchMessages = async () => {
// // // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // // //       try {
// // // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // // //         const formatted = res.data.map(msg => ({
// // // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // // //           message: msg.message,
// // // //           file: msg.file
// // // //         }));
// // // //         setChatMessages(formatted);
// // // //       } catch (err) {
// // // //         console.error('Error fetching messages:', err);
// // // //       }
// // // //     };
// // // //     fetchMessages();
// // // //   }, [receiverId, currentUserId]);

// // // //   const handleSearch = async () => {
// // // //     if (!searchMobile.trim()) return;
// // // //     try {
// // // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // // //       setSearchedUser(res.data);
// // // //     } catch (err) {
// // // //       console.error('User not found:', err);
// // // //       alert('User not found');
// // // //       setSearchedUser(null);
// // // //     }
// // // //   };

// // // //   const sendMessage = async () => {
// // // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // // //     let uploadedFile = null;
// // // //     if (file) {
// // // //       const formData = new FormData();
// // // //       formData.append('file', file);
// // // //       try {
// // // //         const res = await axios.post('/upload', formData, {
// // // //           headers: { 'Content-Type': 'multipart/form-data' }
// // // //         });
// // // //         uploadedFile = res.data;
// // // //       } catch (err) {
// // // //         console.error('File upload failed:', err);
// // // //         return;
// // // //       }
// // // //     }

// // // //     socket.emit('privateMessage', {
// // // //       to: receiverId,
// // // //       from: currentUserId,
// // // //       message,
// // // //       file: uploadedFile
// // // //     });

// // // //     setChatMessages((prev) => [
// // // //       ...prev,
// // // //       { from: 'You', message, file: uploadedFile }
// // // //     ]);

// // // //     setMessage('');
// // // //     setFile(null);
// // // //   };

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem('token');
// // // //     localStorage.removeItem('userId');
// // // //     navigate('/login');
// // // //   };

// // // //   const renderFilePreview = (file) => {
// // // //     if (!file) return null;
// // // //     const url = `http://localhost:5000${file.url}`;
// // // //     if (file.type.startsWith('image/')) {
// // // //       return <img src={url} alt="img" className={styles.chatImage} />;
// // // //     }
// // // //     if (file.type.startsWith('video/')) {
// // // //       return (
// // // //         <video controls className={styles.chatVideo}>
// // // //           <source src={url} type={file.type} />
// // // //         </video>
// // // //       );
// // // //     }
// // // //     if (file.type === 'application/pdf') {
// // // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // // //     }
// // // //     return <a href={url} download>⬇️ Download File</a>;
// // // //   };

// // // //   return (
// // // //     <div className={styles.chatContainer}>
// // // //       <div className={styles.chatSidebar}>
// // // //         <input
// // // //           className={styles.searchInput}
// // // //           type="text"
// // // //           placeholder="Enter mobile number"
// // // //           value={searchMobile}
// // // //           onChange={(e) => setSearchMobile(e.target.value)}
// // // //         />
// // // //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// // // //         {searchedUser && (
// // // //           <div
// // // //             className={styles.userBox}
// // // //             onClick={() => {
// // // //               setReceiverId(searchedUser._id);
// // // //               setReceiverInfo(searchedUser);
// // // //               setChatMessages([]);
// // // //             }}
// // // //           >
// // // //             <div className={styles.userInfo}>
// // // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       <div className={styles.chatMain}>
// // // //         <div className={styles.chatNavbar}>
// // // //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// // // //           <div className={styles.dropdownWrapper}>
// // // //             <button className={styles.dropdownToggle} onClick={() => setShowDropdown(!showDropdown)}>
// // // //               Options
// // // //             </button>
// // // //             {showDropdown && (
// // // //               <div className={styles.dropdownMenu}>
// // // //                 <div onClick={() => {
// // // //                   setShowProfileModal(true);
// // // //                   setShowDropdown(false);
// // // //                 }}>Your Profile</div>
// // // //                 <div onClick={handleLogout}>Logout</div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         <div className={styles.messagesBox}>
// // // //           {chatMessages.map((msg, index) => (
// // // //             <div key={index} className={styles.messageItem}>
// // // //               <span className={styles.messageSender}>{msg.from}:</span>
// // // //               {msg.message && <span>{msg.message}</span>}
// // // //               <div>{renderFilePreview(msg.file)}</div>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         <div className={styles.inputArea}>
// // // //           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
// // // //           <input
// // // //             className={styles.messageInput}
// // // //             type="text"
// // // //             placeholder="Type a message"
// // // //             value={message}
// // // //             onChange={(e) => setMessage(e.target.value)}
// // // //           />
// // // //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // // //         </div>
// // // //       </div>

// // // //       {showProfileModal && (
// // // //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// // // //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// // // //             <h2>Your Profile</h2>
// // // //             <p>Implement profile editing here.</p>
// // // //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Chat;


// // // import React, { useEffect, useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import socket from '../socket';
// // // import axios from '../axios';
// // // import styles from './Chat.module.css';

// // // function Chat() {
// // //   const [message, setMessage] = useState('');
// // //   const [chatMessages, setChatMessages] = useState([]);
// // //   const [receiverId, setReceiverId] = useState('');
// // //   const [currentUserId, setCurrentUserId] = useState(null);
// // //   const [file, setFile] = useState(null);
// // //   const [searchMobile, setSearchMobile] = useState('');
// // //   const [searchedUser, setSearchedUser] = useState(null);
// // //   const [receiverInfo, setReceiverInfo] = useState(null);
// // //   const [showDropdown, setShowDropdown] = useState(false);
// // //   const [showProfileModal, setShowProfileModal] = useState(false);

// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const storedId = localStorage.getItem('userId');
// // //     setCurrentUserId(storedId);
// // //     if (storedId) socket.emit('join', storedId);
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleReceive = (data) => {
// // //       const isActiveChat = data.senderId === receiverId || data.receiverId === receiverId;
// // //       if (!isActiveChat) return;
// // //       const isFromCurrentUser = data.senderId === currentUserId;
// // //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';
// // //       setChatMessages((prev) => [
// // //         ...prev,
// // //         {
// // //           from: displayName,
// // //           message: data.message,
// // //           file: data.file || null
// // //         }
// // //       ]);
// // //     };
// // //     socket.on('receiveMessage', handleReceive);
// // //     return () => socket.off('receiveMessage', handleReceive);
// // //   }, [receiverId, currentUserId]);

// // //   useEffect(() => {
// // //     const fetchMessages = async () => {
// // //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// // //       try {
// // //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// // //         const formatted = res.data.map(msg => ({
// // //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// // //           message: msg.message,
// // //           file: msg.file
// // //         }));
// // //         setChatMessages(formatted);
// // //       } catch (err) {
// // //         console.error('Error fetching messages:', err);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [receiverId, currentUserId]);

// // //   const handleSearch = async () => {
// // //     if (!searchMobile.trim()) return;
// // //     try {
// // //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// // //       setSearchedUser(res.data);
// // //     } catch (err) {
// // //       console.error('User not found:', err);
// // //       alert('User not found');
// // //       setSearchedUser(null);
// // //     }
// // //   };

// // //   const sendMessage = async () => {
// // //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// // //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// // //     let uploadedFile = null;
// // //     if (file) {
// // //       const formData = new FormData();
// // //       formData.append('file', file);
// // //       try {
// // //         const res = await axios.post('/upload', formData, {
// // //           headers: { 'Content-Type': 'multipart/form-data' }
// // //         });
// // //         uploadedFile = res.data;
// // //       } catch (err) {
// // //         console.error('File upload failed:', err);
// // //         return;
// // //       }
// // //     }

// // //     socket.emit('privateMessage', {
// // //       to: receiverId,
// // //       from: currentUserId,
// // //       message,
// // //       file: uploadedFile
// // //     });

// // //     setChatMessages((prev) => [
// // //       ...prev,
// // //       { from: 'You', message, file: uploadedFile }
// // //     ]);

// // //     setMessage('');
// // //     setFile(null);
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.removeItem('token');
// // //     localStorage.removeItem('userId');
// // //     navigate('/login');
// // //   };

// // //   const renderFilePreview = (file) => {
// // //     if (!file) return null;
// // //     const url = `http://localhost:5000${file.url}`;
// // //     if (file.type.startsWith('image/')) {
// // //       return <img src={url} alt="img" className={styles.chatImage} />;
// // //     }
// // //     if (file.type.startsWith('video/')) {
// // //       return (
// // //         <video controls className={styles.chatVideo}>
// // //           <source src={url} type={file.type} />
// // //         </video>
// // //       );
// // //     }
// // //     if (file.type === 'application/pdf') {
// // //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// // //     }
// // //     return <a href={url} download>⬇️ Download File</a>;
// // //   };

// // //   return (
// // //     <div className={styles.chatContainer}>
// // //       <div className={styles.chatSidebar}>
// // //         <input
// // //           className={styles.searchInput}
// // //           type="text"
// // //           placeholder="Enter mobile number"
// // //           value={searchMobile}
// // //           onChange={(e) => setSearchMobile(e.target.value)}
// // //         />
// // //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// // //         {searchedUser && (
// // //           <div
// // //             className={styles.userBox}
// // //             onClick={() => {
// // //               setReceiverId(searchedUser._id);
// // //               setReceiverInfo(searchedUser);
// // //               setChatMessages([]);
// // //             }}
// // //           >
// // //             <div className={styles.userInfo}>
// // //               <p><strong>Name:</strong> {searchedUser.name}</p>
// // //               <p><strong>Email:</strong> {searchedUser.email}</p>
// // //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className={styles.chatMain}>
// // //         <div className={styles.chatNavbar}>
// // //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// // //           <div className={styles.dropdownWrapper}>
// // //             <button className={styles.dropdownToggle} onClick={() => setShowDropdown(!showDropdown)}>
// // //               Options
// // //             </button>
// // //             {showDropdown && (
// // //               <div className={styles.dropdownMenu}>
// // //                 <div onClick={() => {
// // //                   setShowProfileModal(true);
// // //                   setShowDropdown(false);
// // //                 }}>Your Profile</div>
// // //                 <div onClick={handleLogout}>Logout</div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div className={styles.messagesBox}>
// // //           {chatMessages.map((msg, index) => (
// // //             <div key={index} className={styles.messageItem}>
// // //               <span className={styles.messageSender}>{msg.from}:</span>
// // //               {msg.message && <span>{msg.message}</span>}
// // //               <div>{renderFilePreview(msg.file)}</div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div className={styles.inputArea}>
// // //           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
// // //           <input
// // //             className={styles.fileInput}
// // //             type="text"
// // //             placeholder="Type a message"
// // //             value={message}
// // //             onChange={(e) => setMessage(e.target.value)}
// // //           />
// // //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // //         </div>
// // //       </div>

// // //       {showProfileModal && (
// // //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// // //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// // //             <h2>Your Profile</h2>
// // //             <p>Implement profile editing here.</p>
// // //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Chat;

// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import socket from '../socket';
// // import axios from '../axios';
// // import styles from './Chat.module.css';

// // function Chat() {
// //   const [message, setMessage] = useState('');
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [receiverId, setReceiverId] = useState('');
// //   const [currentUserId, setCurrentUserId] = useState(null);
// //   const [file, setFile] = useState(null);
// //   const [searchMobile, setSearchMobile] = useState('');
// //   const [searchedUser, setSearchedUser] = useState(null);
// //   const [receiverInfo, setReceiverInfo] = useState(null);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [showProfileModal, setShowProfileModal] = useState(false);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedId = localStorage.getItem('userId');
// //     setCurrentUserId(storedId);
// //     if (storedId) socket.emit('join', storedId);
// //   }, []);

// //   useEffect(() => {
// //     const handleReceive = (data) => {
// //       const isActiveChat =
// //         data.senderId === receiverId || data.receiverId === receiverId;
// //       if (!isActiveChat) return;
// //       const isFromCurrentUser = data.senderId === currentUserId;
// //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';
// //       setChatMessages((prev) => [
// //         ...prev,
// //         {
// //           from: displayName,
// //           message: data.message,
// //           file: data.file || null
// //         }
// //       ]);
// //     };
// //     socket.on('receiveMessage', handleReceive);
// //     return () => socket.off('receiveMessage', handleReceive);
// //   }, [receiverId, currentUserId]);

// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// //       try {
// //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// //         const formatted = res.data.map(msg => ({
// //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// //           message: msg.message,
// //           file: msg.file
// //         }));
// //         setChatMessages(formatted);
// //       } catch (err) {
// //         console.error('Error fetching messages:', err);
// //       }
// //     };
// //     fetchMessages();
// //   }, [receiverId, currentUserId]);

// //   const handleSearch = async () => {
// //     if (!searchMobile.trim()) return;
// //     try {
// //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// //       setSearchedUser(res.data);
// //     } catch (err) {
// //       console.error('User not found:', err);
// //       alert('User not found');
// //       setSearchedUser(null);
// //     }
// //   };

// //   const sendMessage = async () => {
// //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// //     let uploadedFile = null;
// //     if (file) {
// //       const formData = new FormData();
// //       formData.append('file', file);
// //       try {
// //         const res = await axios.post('/upload', formData, {
// //           headers: { 'Content-Type': 'multipart/form-data' }
// //         });
// //         uploadedFile = res.data;
// //       } catch (err) {
// //         console.error('File upload failed:', err);
// //         return;
// //       }
// //     }

// //     socket.emit('privateMessage', {
// //       to: receiverId,
// //       from: currentUserId,
// //       message,
// //       file: uploadedFile
// //     });

// //     setChatMessages((prev) => [
// //       ...prev,
// //       { from: 'You', message, file: uploadedFile }
// //     ]);

// //     setMessage('');
// //     setFile(null);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('userId');
// //     navigate('/login');
// //   };

// //   const renderFilePreview = (file) => {
// //     if (!file) return null;
// //     const url = `http://localhost:5000${file.url}`;
// //     if (file.type.startsWith('image/')) {
// //       return <img src={url} alt="img" className={styles.chatImage} />;
// //     }
// //     if (file.type.startsWith('video/')) {
// //       return (
// //         <video controls className={styles.chatVideo}>
// //           <source src={url} type={file.type} />
// //         </video>
// //       );
// //     }
// //     if (file.type === 'application/pdf') {
// //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// //     }
// //     return <a href={url} download>⬇️ Download File</a>;
// //   };

// //   return (
// //     <div className={styles.chatContainer}>
// //       <div className={styles.chatSidebar}>
// //         <input
// //           className={styles.searchInput}
// //           type="text"
// //           placeholder="Enter mobile number"
// //           value={searchMobile}
// //           onChange={(e) => setSearchMobile(e.target.value)}
// //         />
// //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// //         {searchedUser && (
// //           <div
// //             className={styles.userBox}
// //             onClick={() => {
// //               setReceiverId(searchedUser._id);
// //               setReceiverInfo(searchedUser);
// //               setChatMessages([]);
// //             }}
// //           >
// //             <div className={styles.userInfo}>
// //               <p><strong>Name:</strong> {searchedUser.name}</p>
// //               <p><strong>Email:</strong> {searchedUser.email}</p>
// //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div className={styles.chatMain}>
// //         <div className={styles.chatNavbar}>
// //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// //           <div className={styles.dropdownWrapper}>
// //             <button className={styles.dropdownToggle} onClick={() => setShowDropdown(!showDropdown)}>
// //               Options
// //             </button>
// //             {showDropdown && (
// //               <div className={styles.dropdownMenu}>
// //                 <div onClick={() => {
// //                   setShowProfileModal(true);
// //                   setShowDropdown(false);
// //                 }}>Your Profile</div>
// //                 <div onClick={handleLogout}>Logout</div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className={styles.messagesBox}>
// //           {chatMessages.map((msg, index) => (
// //             <div key={index} className={styles.messageItem}>
// //               <span className={styles.messageSender}>{msg.from}:</span>
// //               {msg.message && <span>{msg.message}</span>}
// //               <div>{renderFilePreview(msg.file)}</div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className={styles.inputArea}>
// //           <input
// //             type="file"
// //             className={styles.fileUploader}
// //             onChange={(e) => setFile(e.target.files[0])}
// //           />
// //           <input
// //             className={styles.messageInput}
// //             type="text"
// //             placeholder="Type a message"
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //           />
// //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// //         </div>
// //       </div>

// //       {showProfileModal && (
// //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// //             <h2>Your Profile</h2>
// //             <p>Implement profile editing here.</p>
// //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Chat;

// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import socket from '../socket';
// // import axios from '../axios';
// // import styles from './Chat.module.css';

// // function Chat() {
// //   const [message, setMessage] = useState('');
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [receiverId, setReceiverId] = useState('');
// //   const [currentUserId, setCurrentUserId] = useState(null);
// //   const [file, setFile] = useState(null);
// //   const [searchMobile, setSearchMobile] = useState('');
// //   const [searchedUser, setSearchedUser] = useState(null);
// //   const [receiverInfo, setReceiverInfo] = useState(null);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [showProfileModal, setShowProfileModal] = useState(false);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedId = localStorage.getItem('userId');
// //     setCurrentUserId(storedId);
// //     if (storedId) socket.emit('join', storedId);
// //   }, []);

// //   useEffect(() => {
// //     const handleReceive = (data) => {
// //       const isActiveChat =
// //         data.senderId === receiverId || data.receiverId === receiverId;
// //       if (!isActiveChat) return;
// //       const isFromCurrentUser = data.senderId === currentUserId;
// //       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';
// //       setChatMessages((prev) => [
// //         ...prev,
// //         {
// //           from: displayName,
// //           message: data.message,
// //           file: data.file || null
// //         }
// //       ]);
// //     };
// //     socket.on('receiveMessage', handleReceive);
// //     return () => socket.off('receiveMessage', handleReceive);
// //   }, [receiverId, currentUserId]);

// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
// //       try {
// //         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
// //         const formatted = res.data.map(msg => ({
// //           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
// //           message: msg.message,
// //           file: msg.file
// //         }));
// //         setChatMessages(formatted);
// //       } catch (err) {
// //         console.error('Error fetching messages:', err);
// //       }
// //     };
// //     fetchMessages();
// //   }, [receiverId, currentUserId]);

// //   const handleSearch = async () => {
// //     if (!searchMobile.trim()) return;
// //     try {
// //       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
// //       setSearchedUser(res.data);
// //     } catch (err) {
// //       console.error('User not found:', err);
// //       alert('User not found');
// //       setSearchedUser(null);
// //     }
// //   };

// //   const sendMessage = async () => {
// //     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
// //     if (receiverId === currentUserId) return alert("You can't message yourself.");

// //     let uploadedFile = null;
// //     if (file) {
// //       const formData = new FormData();
// //       formData.append('file', file);
// //       try {
// //         const res = await axios.post('/upload', formData, {
// //           headers: { 'Content-Type': 'multipart/form-data' }
// //         });
// //         uploadedFile = res.data;
// //       } catch (err) {
// //         console.error('File upload failed:', err);
// //         return;
// //       }
// //     }

// //     socket.emit('privateMessage', {
// //       to: receiverId,
// //       from: currentUserId,
// //       message,
// //       file: uploadedFile
// //     });

// //     setChatMessages((prev) => [
// //       ...prev,
// //       { from: 'You', message, file: uploadedFile }
// //     ]);

// //     setMessage('');
// //     setFile(null);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('userId');
// //     navigate('/login');
// //   };

// //   const renderFilePreview = (file) => {
// //     if (!file) return null;
// //     const url = `http://localhost:5000${file.url}`;
// //     if (file.type.startsWith('image/')) {
// //       return <img src={url} alt="img" className={styles.chatImage} />;
// //     }
// //     if (file.type.startsWith('video/')) {
// //       return (
// //         <video controls className={styles.chatVideo}>
// //           <source src={url} type={file.type} />
// //         </video>
// //       );
// //     }
// //     if (file.type === 'application/pdf') {
// //       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
// //     }
// //     return <a href={url} download>⬇️ Download File</a>;
// //   };

// //   return (
// //     <div className={styles.chatContainer}>
// //       <div className={styles.chatSidebar}>
// //         <input
// //           className={styles.searchInput}
// //           type="text"
// //           placeholder="Enter mobile number"
// //           value={searchMobile}
// //           onChange={(e) => setSearchMobile(e.target.value)}
// //         />
// //         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

// //         {searchedUser && (
// //           <div
// //             className={styles.userBox}
// //             onClick={() => {
// //               setReceiverId(searchedUser._id);
// //               setReceiverInfo(searchedUser);
// //               setChatMessages([]);
// //             }}
// //           >
// //             <div className={styles.userInfo}>
// //               <p><strong>Name:</strong> {searchedUser.name}</p>
// //               <p><strong>Email:</strong> {searchedUser.email}</p>
// //               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div className={styles.chatMain}>
// //         <div className={styles.chatNavbar}>
// //           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
// //           <div className={styles.dropdownWrapper}>
// //             <button className={styles.dropdownToggle} onClick={() => setShowDropdown(!showDropdown)}>
// //               Options
// //             </button>
// //             {showDropdown && (
// //               <div className={styles.dropdownMenu}>
// //                 <div onClick={() => {
// //                   setShowProfileModal(true);
// //                   setShowDropdown(false);
// //                 }}>Your Profile</div>
// //                 <div onClick={handleLogout}>Logout</div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className={styles.messagesBox}>
// //           {chatMessages.map((msg, index) => (
// //             <div key={index} className={styles.messageItem}>
// //               <span className={styles.messageSender}>{msg.from}:</span>
// //               {msg.message && <span>{msg.message}</span>}
// //               <div>{renderFilePreview(msg.file)}</div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className={styles.inputArea}>
// //           <input
// //             type="file"
// //             className={styles.fileUploader}
// //             onChange={(e) => setFile(e.target.files[0])}
// //           />
// //           <input
// //             className={styles.messageInput}
// //             type="text"
// //             placeholder="Type a message"
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //           />
// //           <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// //         </div>
// //       </div>

// //       {showProfileModal && (
// //         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
// //           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
// //             <h2>Your Profile</h2>
// //             <p>Implement profile editing here.</p>
// //             <button onClick={() => setShowProfileModal(false)}>Close</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Chat;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import socket from '../socket';
// import axios from '../axios';
// import styles from './Chat.module.css';
// import EditProfileModal from './EditProfileModal.jsx'; // adjust path if needed


// function Chat() {
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [receiverId, setReceiverId] = useState('');
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [file, setFile] = useState(null);
//   const [searchMobile, setSearchMobile] = useState('');
//   const [searchedUser, setSearchedUser] = useState(null);
//   const [receiverInfo, setReceiverInfo] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedId = localStorage.getItem('userId');
//     setCurrentUserId(storedId);
//     if (storedId) socket.emit('join', storedId);
//   }, []);

//   useEffect(() => {
//     const handleReceive = (data) => {
//       const isActiveChat =
//         data.senderId === receiverId || data.receiverId === receiverId;
//       if (!isActiveChat) return;
//       const isFromCurrentUser = data.senderId === currentUserId;
//       const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           from: displayName,
//           message: data.message,
//           file: data.file || null
//         }
//       ]);
//     };
//     socket.on('receiveMessage', handleReceive);
//     return () => socket.off('receiveMessage', handleReceive);
//   }, [receiverId, currentUserId]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!currentUserId || !receiverId || currentUserId === receiverId) return;
//       try {
//         const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
//         const formatted = res.data.map(msg => ({
//           from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
//           message: msg.message,
//           file: msg.file
//         }));
//         setChatMessages(formatted);
//       } catch (err) {
//         console.error('Error fetching messages:', err);
//       }
//     };
//     fetchMessages();
//   }, [receiverId, currentUserId]);

//   const handleSearch = async () => {
//     if (!searchMobile.trim()) return;
//     try {
//       const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
//       setSearchedUser(res.data);
//     } catch (err) {
//       console.error('User not found:', err);
//       alert('User not found');
//       setSearchedUser(null);
//     }
//   };

//   const sendMessage = async () => {
//     if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
//     if (receiverId === currentUserId) return alert("You can't message yourself.");

//     let uploadedFile = null;
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       try {
//         const res = await axios.post('/upload', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         uploadedFile = res.data;
//       } catch (err) {
//         console.error('File upload failed:', err);
//         return;
//       }
//     }

//     socket.emit('privateMessage', {
//       to: receiverId,
//       from: currentUserId,
//       message,
//       file: uploadedFile
//     });

//     setChatMessages((prev) => [
//       ...prev,
//       { from: 'You', message, file: uploadedFile }
//     ]);

//     setMessage('');
//     setFile(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     navigate('/login');
//   };

//   const renderFilePreview = (file) => {
//     if (!file) return null;
//     const url = `http://localhost:5000${file.url}`;
//     if (file.type.startsWith('image/')) {
//       return <img src={url} alt="img" className={styles.chatImage} />;
//     }
//     if (file.type.startsWith('video/')) {
//       return (
//         <video controls className={styles.chatVideo}>
//           <source src={url} type={file.type} />
//         </video>
//       );
//     }
//     if (file.type === 'application/pdf') {
//       return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
//     }
//     return <a href={url} download>⬇️ Download File</a>;
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.chatSidebar}>
//         <input
//           className={styles.searchInput}
//           type="text"
//           placeholder="Enter mobile number"
//           value={searchMobile}
//           onChange={(e) => setSearchMobile(e.target.value)}
//         />
//         <button className={styles.searchButton} onClick={handleSearch}>Search</button>

//         {searchedUser && (
//           <div
//             className={styles.userBox}
//             onClick={() => {
//               setReceiverId(searchedUser._id);
//               setReceiverInfo(searchedUser);
//               setChatMessages([]);
//             }}
//           >
//             <div className={styles.userInfo}>
//               <p><strong>Name:</strong> {searchedUser.name}</p>
//               <p><strong>Email:</strong> {searchedUser.email}</p>
//               <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className={styles.chatMain}>
//         <div className={styles.chatNavbar}>
//           <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
//           <div className={styles.dropdownWrapper}>
//             <button className={styles.dropdownToggle} onClick={() => setShowDropdown(!showDropdown)}>
//               Options
//             </button>
//             {/* {showDropdown && (
//               <div className={styles.dropdownMenu}>
//                 <div onClick={() => {
//                   setShowProfileModal(true);
//                   setShowDropdown(false);
//                 }}>Your Profile</div>
//                 <div onClick={handleLogout}>Logout</div>
//               </div>
//             )} */}
//          {showProfileModal && (
//   <EditProfileModal
//     onClose={() => setShowProfileModal(false)}
//     userId={currentUserId}
//   />
// )}


//           </div>
//         </div>

//         <div className={styles.messagesBox}>
//           {chatMessages.map((msg, index) => (
//             <div key={index} className={styles.messageItem}>
//               <span className={styles.messageSender}>{msg.from}:</span>
//               {msg.message && <span>{msg.message}</span>}
//               <div>{renderFilePreview(msg.file)}</div>
//             </div>
//           ))}
//         </div>

//         <div className={styles.inputArea}>
//           <label className={styles.fileUploaderLabel}>
//             📎 File
//             <input
//               type="file"
//               className={styles.fileUploader}
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </label>

//           <input
//             className={styles.messageInput}
//             type="text"
//             placeholder="Type a message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{width:'50%'}}
//           />

//           <button className={styles.sendButton} style={{width:'100px'}} onClick={sendMessage}>➤ Send</button>
//         </div>
//       </div>

//       {showProfileModal && (
//         <div className={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <h2>Your Profile</h2>
//             <p>Implement profile editing here.</p>
//             <button onClick={() => setShowProfileModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import axios from '../axios';
import styles from './Chat.module.css';
import EditProfileModal from './EditProfileModal.jsx'; // adjust path if needed

function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [file, setFile] = useState(null);
  const [searchMobile, setSearchMobile] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    setCurrentUserId(storedId);
    if (storedId) socket.emit('join', storedId);
  }, []);

  useEffect(() => {
    const handleReceive = (data) => {
      const isActiveChat =
        data.senderId === receiverId || data.receiverId === receiverId;
      if (!isActiveChat) return;
      const isFromCurrentUser = data.senderId === currentUserId;
      const displayName = isFromCurrentUser ? 'You' : data.senderName || 'Unknown';
      setChatMessages((prev) => [
        ...prev,
        {
          from: displayName,
          message: data.message,
          file: data.file || null
        }
      ]);
    };
    socket.on('receiveMessage', handleReceive);
    return () => socket.off('receiveMessage', handleReceive);
  }, [receiverId, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUserId || !receiverId || currentUserId === receiverId) return;
      try {
        const res = await axios.get(`/messages/${currentUserId}/${receiverId}`);
        const formatted = res.data.map(msg => ({
          from: msg.from === currentUserId ? 'You' : msg.senderName || 'Unknown',
          message: msg.message,
          file: msg.file
        }));
        setChatMessages(formatted);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchMessages();
  }, [receiverId, currentUserId]);

  const handleSearch = async () => {
    if (!searchMobile.trim()) return;
    try {
      const res = await axios.get(`/auth/find/${searchMobile.trim()}`);
      setSearchedUser(res.data);
    } catch (err) {
      console.error('User not found:', err);
      alert('User not found');
      setSearchedUser(null);
    }
  };

  const sendMessage = async () => {
    if ((!message.trim() && !file) || !receiverId || !currentUserId) return;
    if (receiverId === currentUserId) return alert("You can't message yourself.");

    let uploadedFile = null;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await axios.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedFile = res.data;
      } catch (err) {
        console.error('File upload failed:', err);
        return;
      }
    }

    socket.emit('privateMessage', {
      to: receiverId,
      from: currentUserId,
      message,
      file: uploadedFile
    });

    setChatMessages((prev) => [
      ...prev,
      { from: 'You', message, file: uploadedFile }
    ]);

    setMessage('');
    setFile(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const renderFilePreview = (file) => {
    if (!file) return null;
    const url = `http://localhost:5000${file.url}`;
    if (file.type.startsWith('image/')) {
      return <img src={url} alt="img" className={styles.chatImage} />;
    }
    if (file.type.startsWith('video/')) {
      return (
        <video controls className={styles.chatVideo}>
          <source src={url} type={file.type} />
        </video>
      );
    }
    if (file.type === 'application/pdf') {
      return <a href={url} target="_blank" rel="noopener noreferrer">📄 View PDF</a>;
    }
    return <a href={url} download>⬇️ Download File</a>;
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatSidebar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Enter mobile number"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>

        {searchedUser && (
          <div
            className={styles.userBox}
            onClick={() => {
              setReceiverId(searchedUser._id);
              setReceiverInfo(searchedUser);
              setChatMessages([]);
            }}
          >
            <div className={styles.userInfo}>
              <p><strong>Name:</strong> {searchedUser.name}</p>
              <p><strong>Email:</strong> {searchedUser.email}</p>
              <p><strong>Mobile:</strong> {searchedUser.mobile}</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.chatMain}>
        <div className={styles.chatNavbar}>
          <span>{receiverInfo ? `Chatting with: ${receiverInfo.name}` : 'Select a user to chat'}</span>
          <div className={styles.dropdownWrapper}>
            <button className={styles.dropdownToggle} onClick={() => setShowDropdown(!showDropdown)}>
              Options
            </button>
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <div onClick={() => {
                  setShowProfileModal(true);
                  setShowDropdown(false);
                }}>Your Profile</div>
                <div onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.messagesBox}>
          {chatMessages.map((msg, index) => (
            <div key={index} className={styles.messageItem}>
              <span className={styles.messageSender}>{msg.from}:</span>
              {msg.message && <span>{msg.message}</span>}
              <div>{renderFilePreview(msg.file)}</div>
            </div>
          ))}
        </div>

        <div className={styles.inputArea}>
          <label className={styles.fileUploaderLabel}>
            📎 File
            <input
              type="file"
              className={styles.fileUploader}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <input
            className={styles.messageInput}
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '50%' }}
          />

          <button className={styles.sendButton} style={{ width: '100px' }} onClick={sendMessage}>➤ Send</button>
        </div>
      </div>

      {showProfileModal && (
        <EditProfileModal
          onClose={() => setShowProfileModal(false)}
          userId={currentUserId}
        />
      )}
    </div>
  );
}

export default Chat;
