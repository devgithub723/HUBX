

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const uploadRoute = require('./routes/upload');
const messageRoutes = require('./routes/messages');
const User = require('./models/User');
const Message = require('./models/Message');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ CORS origins
const allowedOrigins = ['https://hubx-5.onrender.com', 'http://localhost:5173'];

// ✅ Apply CORS middleware to Express
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Socket.IO CORS settings
const io = socketIO(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Express setup
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo Error:', err));

// ✅ Socket.IO Logic
const activeUsers = {};

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join', (userId) => {
    activeUsers[userId] = socket.id;
    socket.join(userId);
  });

  socket.on('privateMessage', async ({ to, from, message, file }) => {
    try {
      const sender = await User.findById(from);
      if (!sender) return;

      const newMessage = new Message({
        senderId: from,
        receiverId: to,
        message: message || '',
        fileUrl: file?.url || null,
        fileType: file?.type || null
      });
      await newMessage.save();

      io.to(to).emit('receiveMessage', {
        message,
        senderId: sender._id.toString(),
        senderName: sender.name,
        file: file || null
      });

    } catch (err) {
      console.error('Message error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    const userId = Object.keys(activeUsers).find(key => activeUsers[key] === socket.id);
    if (userId) {
      delete activeUsers[userId];
    }
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
