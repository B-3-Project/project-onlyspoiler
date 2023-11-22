import express from "express";
import { ROUTES } from "../../constants/profile.constant.js";

//
const router = express.Router();

// GET 회원정보 조회
router.get(ROUTES.PROFILE, 유효성검사, profile); //컨트롤러 profile

export default router;
