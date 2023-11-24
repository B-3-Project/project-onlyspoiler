import express from "express";
import { ROUTES } from "../../constants/profile.constant.js";
import { getUserProfile, putUserProfile, changePassword } from "../../controllers/users/users.controller.js"
import { validateProfie } from "../../validates/users/profile.validate.js"
const router = express.Router();

// GET 회원정보 조회
router.get(ROUTES.PROFILE, validateProfie, getUserProfile);

// PUT 회원정보 수정
router.put(ROUTES.PROFILE, validateProfie, putUserProfile);

// 비밀번호 변경
router.put(ROUTES.CHANGEPASSWORD, validateProfie, changePassword);

export default router;
