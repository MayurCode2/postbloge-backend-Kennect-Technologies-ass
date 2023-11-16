// controllers/commentController.js
const Comment = require("../models/commentModel")
const Post = require("../models/postModel");
const jwt = require('jsonwebtoken');

// exports.addComment = async (req, res) => {
//   try {
//     const { user, message, post } = req.body;
//     const newComment = new Comment({ user, message, post });
//     await newComment.save();

//     // Update the associated post with the new comment
//     await Post.findByIdAndUpdate(post, { $push: { comments: newComment._id } });

//     res.json({ message: 'Comment added successfully', comment: newComment });
//   } catch (error) {
//     console.error('Add Comment Error:', error);
//     res.status(500).json({ error: 'Internal Server Error - Add Comment' });
//   }
// };

exports.addComment = async (req, res) => {
  try {
    const { message, postId } = req.body;

    // Validate that postId is provided
    if (!postId) {
      return res.status(400).json({ error: 'postId is required' });
    }

    // Extract user ID from the token
    const token = req.header('Authorization');
    const decodedToken = jwt.verify(token, 'secret_key');
    const userId = decodedToken.userId;

    const newComment = new Comment({ user: userId, message, post: postId });
    await newComment.save();

    // Update the associated post with the new comment
    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

    res.json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Add Comment Error:', error);
    res.status(500).json({ error: 'Internal Server Error - Add Comment' });
  }
};
