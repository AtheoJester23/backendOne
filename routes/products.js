import express from "express";
import {
  addProduct,
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

//POST New Product:
router.post("/", addProduct);

//DELETE a product:
router.delete("/", deleteProd);

export default router;
