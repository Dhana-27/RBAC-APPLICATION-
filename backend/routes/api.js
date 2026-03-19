const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const Log = require('../models/Log');

// Use token verification for all API routes
router.use(verifyToken);

// Guest endpoint
router.get('/public-alerts', requireRole(['admin', 'analyst', 'user', 'guest']), (req, res) => {
  res.json({ message: 'Public Threat Alert: System operations normal. No current widespread attacks detected.' });
});

// User endpoint
router.get('/user-dashboard', requireRole(['admin', 'analyst', 'user']), (req, res) => {
  res.json({ message: 'Welcome to the User Dashboard. No personalized incidents reported.' });
});

router.post('/report-incident', requireRole(['admin', 'analyst', 'user']), (req, res) => {
  res.json({ message: 'Incident reported successfully' });
});

// Analyst endpoint
router.get('/threat-dashboard', requireRole(['admin', 'analyst']), (req, res) => {
  res.json({ message: 'Classified Analyst Threat Intelligence: Suspicious IP traffic detected from sector 7G.' });
});

// Admin endpoints
router.get('/admin-dashboard', requireRole(['admin']), (req, res) => {
  res.json({ message: 'Admin Control Panel Access Granted. Full system permissions enabled.' });
});

router.get('/system-logs', requireRole(['admin', 'analyst']), async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

module.exports = router;
