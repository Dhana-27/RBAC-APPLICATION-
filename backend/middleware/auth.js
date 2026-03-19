const jwt = require('jsonwebtoken');
const Log = require('../models/Log');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const requireRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        // Log the denied access attempt
        await Log.create({
          user: req.user ? req.user.username : 'anonymous',
          role: req.user ? req.user.role : 'none',
          action: 'ACCESS',
          resource: req.originalUrl,
          status: 'denied',
          ipAddress: req.ip
        });
        
        return res.status(403).json({ message: 'Access Denied – Insufficient Privileges' });
      }

      // Automatically log successful access attempts to protected resources
      if (req.originalUrl !== '/api/data/system-logs') {
        // Option to reduce log noise: we might only log specific actions or just keep it simple.
        await Log.create({
          user: req.user.username,
          role: req.user.role,
          action: 'ACCESS',
          resource: req.originalUrl,
          status: 'success',
          ipAddress: req.ip
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { verifyToken, requireRole };
