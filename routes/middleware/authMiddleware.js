// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (ex) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};
