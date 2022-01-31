import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
// import cors from "cors";
import connectDB from "./db/connect.js";

// Routers
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

// Middlewares
import errorHandlerMiddleware from "./middleware/error-handle.js";
import notFoundMiddleware from "./middleware/not-found.js";

// env
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
// app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("hello world");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
