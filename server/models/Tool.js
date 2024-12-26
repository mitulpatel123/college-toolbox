// models/Tool.js
import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, default: '' },
});

export default mongoose.model('Tool', toolSchema);
