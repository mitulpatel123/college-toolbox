// routes/categoryRoutes.js
import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching categories' });
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Server error creating category' });
  }
});

// DELETE a category by its custom ID
router.delete('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findOneAndDelete({ id: categoryId });

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting category' });
  }
});

export default router;
