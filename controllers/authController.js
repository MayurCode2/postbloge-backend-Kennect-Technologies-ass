// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.json({ token });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Internal Server Error - Registration' });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       console.error('Invalid username or password');
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     const token = generateToken(user);
//     res.json({ token });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ error: 'Internal Server Error - Login' });
//   }
// };



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '24h' });
    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
      }
     });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

