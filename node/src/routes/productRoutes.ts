import {
  deleteProd,
  findProduct,
  updateProd,
} from "./../controllers/productController.js";
import { Router } from "express";
import { getProducts, addProducts } from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.post("/", addProducts);

router.get("/:id", findProduct);
router.put("/:id", updateProd);
router.delete("/:id", deleteProd);

export default router;
