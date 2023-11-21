import express from "express";
import { ROUTES } from "../../constants/auth.constant.js";
import { signup } from "../../controllers/auth/auth.controller.js";
import { validateSignup } from "../../validates/auth/signup.validate.js";

const router = express.Router();

// POST
router.post(ROUTES.SIGNUP, validateSignup, signup);

export default router;
