import { io } from 'socket.io-client';

const socket = io('https://hubx-3imk.onrender.com', {
  transports: ['websocket'],      // 🔥 use websocket instead of polling
  withCredentials: true,          // ✅ allows cookies/auth headers to be sent
});

export default socket;
