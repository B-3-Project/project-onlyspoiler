import express from "express";
import { ROUTES } from "../../constants/profile.constant.js";
import { getUserProfile, putUserProfile, changePassword } from "../../controllers/users/users.controller.js"
// import { hashPassword } from "../../models/users.cjs"
import { verifyToken, authenticateUser } from "../../middlewares/auth/auth.middleware.js";
const router = express.Router();

// GET 회원정보 조회
router.get(ROUTES.PROFILE, [verifyToken, authenticateUser], getUserProfile);

// PUT 회원정보 수정
router.put(ROUTES.PROFILE, [verifyToken, authenticateUser], putUserProfile);

// 비밀번호 변경
router.put(ROUTES.CHANGEPASSWORD, [verifyToken, authenticateUser], changePassword);

export default router;
