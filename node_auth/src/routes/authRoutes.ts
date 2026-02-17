import { register, login, ping } from "./../controllers/authController.js";
import { Router } from "express";
import { tokenCheck } from "../middlewares/tokenCheck.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/ping", tokenCheck, ping);

export default router;
