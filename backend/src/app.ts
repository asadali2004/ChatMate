import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// ────────────────────────────────────────────
// Middlewares
// ────────────────────────────────────────────
app.use(cors({
  origin: [
    'https://chat-mate-vert.vercel.app', 
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Enable logging in dev only
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan("dev"));
}

// ────────────────────────────────────────────
// Health Check
// ────────────────────────────────────────────
app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      message: "OK",
      description: "Server is running.",
    });
  } catch (err) {
    next(err);
  } finally {
    console.log("Request to / endpoint");
  }
});

// ────────────────────────────────────────────
// Main API Route
// ────────────────────────────────────────────
app.use("/api/v1", appRouter);

export default app;
