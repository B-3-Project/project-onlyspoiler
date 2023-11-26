import express from "express";
import { ROUTES } from "../../constants/auth.constant.js";
import { signup } from "../../controllers/auth/auth.controller.js";
import { login } from "../../controllers/auth/login.controller.js";
import { logout } from "../../controllers/auth/logout.controller.js";
import { validateSignup } from "../../validates/auth/signup.validate.js";
import { validateLogin } from "../../validates/auth/login.validate.js";

const router = express.Router();

// POST 회원가입
router.post(ROUTES.SIGNUP, validateSignup, signup);

// POST 로그인
router.post(ROUTES.LOGIN, validateLogin, login);

// POST 로그아웃
router.post(ROUTES.LOGOUT, logout);

export default router;
