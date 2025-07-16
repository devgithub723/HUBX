

const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/authController');
const User = require('../models/User'); // ← make sure this path is correct for your User model

// POST /api/auth/signup
router.post('/signup', signupUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/find/:mobile ← NEW ROUTE TO SEARCH USER BY MOBILE
// GET /api/auth/profile/:id → Fetch profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/auth/profile/:id → Update profile
router.put('/profile/:id', async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/find/:mobile', async (req, res) => {
  try {
    const { mobile } = req.params;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  } catch (err) {
    console.error('Error in find user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
