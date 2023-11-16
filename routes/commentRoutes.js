// routes/commentRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/add', authenticateToken, commentController.addComment);

module.exports = router;
