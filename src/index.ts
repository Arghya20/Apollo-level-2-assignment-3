import express, { Request, Response, NextFunction } from "express";
import { NotFoundError } from "./errors";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

const mongoURI = "process.env.MONGO_URI";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//here//
app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
