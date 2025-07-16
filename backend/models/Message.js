const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  fileUrl: { type: String }, // for PDF/image/video
  fileType: { type: String }, // 'image', 'pdf', 'video', etc.
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
