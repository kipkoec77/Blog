// posts.js - Routes for post operations

const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

// Validation rules
const postValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid category ID'),
  body('excerpt')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Excerpt cannot be more than 200 characters')
];

// Routes
router.route('/')
  .get(getPosts)
  .post(protect, postValidation, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, postValidation, updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router;

