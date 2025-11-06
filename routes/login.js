import express from "express";
import { toLogin } from "../controllers/login.js";

const router = express.Router();

//Login:
router.post("/", toLogin);

export default router;
