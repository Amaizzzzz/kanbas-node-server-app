import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import "dotenv/config";

// Import routes
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import UserRoutes from "./users/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';

// Ensure required environment variables are set
const requiredEnv = ['FRONTEND_URL', 'MONGODB_URI'];
requiredEnv.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Setup MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000'];
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware for JSON payload parsing
app.use(express.json());

// Route setup
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
