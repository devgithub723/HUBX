// // backend/routes/messages.js
// const express = require('express');
// const router = express.Router();
// const Message = require('../models/Message');
// const User = require('../models/User');

// // Get chat history between two users
// router.get('/:userId/:otherUserId', async (req, res) => {
//   const { userId, otherUserId } = req.params;

//   try {
//     const messages = await Message.find({
//       $or: [
//         { senderId: userId, receiverId: otherUserId },
//         { senderId: otherUserId, receiverId: userId }
//       ]
//     })
//     .sort({ createdAt: 1 })
//     .lean()
//     .populate('senderId', 'name');

//     const formattedMessages = messages.map(msg => ({
//       from: msg.senderId._id.toString(),
//       senderName: msg.senderId.name,
//       message: msg.message,
//       file: msg.fileUrl
//         ? { url: msg.fileUrl, type: msg.fileType }
//         : null,
//     }));

//     res.status(200).json(formattedMessages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');

// Get chat history between two users
router.get('/:userId/:otherUserId', async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('senderId', 'name')
    .lean();

    const formattedMessages = messages.map(msg => ({
      from: msg.senderId._id.toString(),
      senderName: msg.senderId.name,
      message: msg.message,
      file: msg.fileUrl
        ? { url: msg.fileUrl, type: msg.fileType }
        : null,
    }));

    res.status(200).json(formattedMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
