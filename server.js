import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv configuration:
dotenv.config();
const PORT = process.env.PORT;

//express:
const app = express();

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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Testing" });
});
