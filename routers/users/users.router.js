import express from "express";
import { ROUTES } from "../../constants/profile.constant.js";

const router = express.Router();

// GET 회원정보 조회
router.get(ROUTES.PROFILE, validateProfie, getUserProfile);

// PUT 회원정보 수정
router.put(ROUTES.PROFILE, validateProfie, putUserProfile);

export default router;
