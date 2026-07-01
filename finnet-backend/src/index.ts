import express from "express";
import dotenv from "dotenv";
import {corsMiddleware} from "./middleware/cors";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'FinnetTrust API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'FinnetTrust API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      user: '/api/users/:userId',
      posts: '/api/users/:userId/posts',
      createPost: '/api/users/:userId/posts (POST)',
      health: '/health'
    }
  });
});

app.use('/api/users', userRoutes);
app.use('/api/users', postRoutes);

app.use(notFoundHandler);
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Listening to server on port http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`Users: http://localhost:${PORT}/api/users`);
  console.log(`Posts: http://localhost:${PORT}/api/users/:userId/posts`);
}   
)