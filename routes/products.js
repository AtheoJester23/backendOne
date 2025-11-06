import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "initial code" });
});

export default router;
