// controllers/postController.js
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const jwt = require('jsonwebtoken');

exports.createPost = async (req, res) => {
  try {
    const { message } = req.body;

    // Extract user ID from the token
    const token = req.header('Authorization');
    const decodedToken = jwt.verify(token, 'secret_key');
    const userId = decodedToken.userId;

    const newPost = new Post({ user: userId, message });
    await newPost.save();

    res.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ error: 'Internal Server Error - Create Post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user').populate({
      path: 'comments',
      populate: { path: 'user' },
    });
    res.json({ posts });
  } catch (error) {
    console.error('Get All Posts Error:', error);
    res.status(500).json({ error: 'Internal Server Error - Get All Posts' });
  }
};

exports.searchPostsAndComments = async (req, res) => {
  try {
    const { query } = req.params;

    // Use a regular expression for case-insensitive search
    const posts = await Post.find({ message: { $regex: new RegExp(query, 'i') } })
      .populate('user')
      .populate({
        path: 'comments',
        populate: { path: 'user' },
      });

    const comments = await Comment.find({ message: { $regex: new RegExp(query, 'i') } })
      .populate('user')
      .populate('post');

    res.json({ posts, comments });
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Internal Server Error - Search' });
  }
};