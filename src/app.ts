import express from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/database";
import authRoutes from "./routes/authRoutes";

// Import routes here when needed
// import userRoutes from './routes/userRoutes';
// import orderRoutes from './routes/orderRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/v1/auth", authRoutes);
// app.use('/users', userRoutes);
// app.use('/orders', orderRoutes);

// Connect to the database
connectDatabase();

export default app;
