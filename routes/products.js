import express from "express";
import { getProducts } from "../controllers/productsController.js";

const router = express.Router();

//GET All products
router.get("/", getProducts);

export default router;
