import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//Import routers:
import userRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import loginRouter from "./routes/login.js";

//dotenv configuration:
dotenv.config();
const PORT = process.env.PORT;

//express:
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//mongoose connection:
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

//routes:
app.use("/login", loginRouter);
app.use("/users", verifyToken, userRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to DatabaseOne</h1>");
});

//404 handler:
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});
