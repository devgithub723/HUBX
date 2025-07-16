

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
