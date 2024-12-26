// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import toolRoutes from './routes/toolRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // Mongoose 6+ doesn't require useNewUrlParser and useUnifiedTopology
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('College Toolbox Backend is running!');
});

// Use Routes
app.use('/api/tools', toolRoutes);
app.use('/api/categories', categoryRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
