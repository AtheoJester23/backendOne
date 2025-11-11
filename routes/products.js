import express from "express";
import { deleteProd, getProducts } from "../controllers/productsController.js";

const router = express.Router();

//GET All products
router.get("/", getProducts);

//DELETE a product:
router.delete("/", deleteProd);

export default router;
