// categories.js - Routes for category operations

const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

// Validation rules
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: 50 })
    .withMessage('Category name cannot be more than 50 characters'),
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description cannot be more than 200 characters')
];

// Routes
router.route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), categoryValidation, createCategory);

router.route('/:id')
  .get(getCategory)
  .put(protect, authorize('admin'), categoryValidation, updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;

