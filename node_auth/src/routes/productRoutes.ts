import {
  deleteProd,
  findProduct,
  updateProd,
  getProducts,
  addProducts,
} from "./../controllers/productController.js";
import { Router } from "express";
import { tokenCheck } from "../middlewares/tokenCheck.js";

const router = Router();

router.get("/", getProducts);
router.post("/", tokenCheck, addProducts);

router.get("/:id", findProduct);
router.put("/:id", tokenCheck, updateProd);
router.delete("/:id", tokenCheck, deleteProd);

export default router;
