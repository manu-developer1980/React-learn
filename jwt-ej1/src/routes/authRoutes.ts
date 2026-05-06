import { Router } from "express";
import {
  login,
  register,
  profile,
  refresh,
} from "../controllers/authController";
import { tokenCheck } from "../middlewares/tokenCheck";
import { adminCheck } from "../middlewares/adminCheck";

const router = Router();

router.post("/login", login);
router.post("/register", adminCheck, register);
router.get("/profile/:id", tokenCheck, profile);
router.get("/profile", tokenCheck, profile);
router.post("/refresh", refresh);

export default router;
