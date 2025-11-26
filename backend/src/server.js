import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import genreRoutes from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/genres', genreRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
