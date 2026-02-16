import {
  deleteProd,
  findProduct,
  updateProd,
  getProducts,
  addProducts,
} from "./../controllers/productController.js";
import { Router } from "express";

const router = Router();

router.get("/", getProducts);
router.post("/", addProducts);

router.get("/:id", findProduct);
router.put("/:id", updateProd);
router.delete("/:id", deleteProd);

export default router;
