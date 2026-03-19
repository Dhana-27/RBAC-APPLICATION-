const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Log = require('../models/Log');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // Log failed login attempt
      await Log.create({
        user: username,
        role: 'unknown',
        action: 'LOGIN',
        resource: '/api/auth/login',
        status: 'denied',
        ipAddress: req.ip
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '24h' }
    );

    await Log.create({
      user: user.username,
      role: user.role,
      action: 'LOGIN',
      resource: '/api/auth/login',
      status: 'success',
      ipAddress: req.ip
    });

    res.json({
      token,
      user: {
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
