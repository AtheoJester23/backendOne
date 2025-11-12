import express from "express";
import {
  deleteProd,
  getAProduct,
  getProducts,
} from "../controllers/productsController.js";
import { findProd } from "../middlewares/findProduct.js";

const router = express.Router();

//GET All products
router.get("/", getProducts);

//GET Specific Product:
router.get("/:id", findProd, getAProduct);

//DELETE a product:
router.delete("/", deleteProd);

export default router;
