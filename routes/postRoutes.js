// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken, postController.createPost);
router.get('/all', authenticateToken, postController.getAllPosts);
router.get('/search/:query', authenticateToken, postController.searchPostsAndComments);

module.exports = router;
