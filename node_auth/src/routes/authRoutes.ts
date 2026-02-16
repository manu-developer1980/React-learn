import { register, login, ping } from "./../controllers/authController.js";
import { Router } from "express";
import { Auth } from "../middlewares/Auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/ping", Auth, ping);

export default router;
