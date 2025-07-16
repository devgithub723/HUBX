import { io } from 'socket.io-client';

const socket = io('https://hubx-3imk.onrender.com'); // backend server

export default socket;
