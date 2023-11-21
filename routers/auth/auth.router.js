import express from "express";
import { ROUTES } from "../../constants/auth.constant.js";
import { signup } from "../../controllers/auth/auth.controller.js";

const router = express.Router();

// POST
router.post(ROUTES.SIGNUP, signup);

export default router;
