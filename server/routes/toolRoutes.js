// routes/toolRoutes.js
import express from 'express';
import Tool from '../models/Tool.js';

const router = express.Router();

// GET all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching tools' });
  }
});

// POST create a new tool
router.post('/', async (req, res) => {
  try {
    const newTool = new Tool(req.body);
    const savedTool = await newTool.save();
    res.status(201).json(savedTool);
  } catch (err) {
    res.status(500).json({ error: 'Server error creating tool' });
  }
});

// DELETE a tool by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTool = await Tool.findByIdAndDelete(id);
    if (!deletedTool) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.status(200).json({ message: 'Tool deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting tool' });
  }
});

export default router;
