// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');



const app = express();

app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
try {
    mongoose.connect('mongodb+srv://Mpmayur2205:9jHAKJNpskufFem4@cluster0.m3mmrxu.mongodb.net/app_post?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
  
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
  }
// Use authentication, post, and comment routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

module.exports = app;


try {
  const decoded = jwt.verify(token, secretKey);
  console.log('Decoded Token:', decoded);
} catch (error) {
  console.error('Token Verification Failed:', error.message);
}

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
