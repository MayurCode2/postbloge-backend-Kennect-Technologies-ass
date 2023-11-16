// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};
