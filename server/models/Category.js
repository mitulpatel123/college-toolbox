// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  id: { type: String, required: true, unique: true }, // Custom ID (slug)
});

export default mongoose.model('Category', categorySchema);
