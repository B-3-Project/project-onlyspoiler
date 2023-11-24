import express from "express";
import { ROUTES } from "../../constants/comments.constant.js";
import {
  createcomment,
  readcomment,
  updatecomment
} from "../../controllers/comments/comments.controller.js";
import {
  authenticateUser,
  verifyToken
} from "../../middlewares/auth/auth.middleware.js";

const router = express.Router();

// POST 댓글 등록
router.post(
  ROUTES.VIEWALLCOMMENTS,
  [verifyToken, authenticateUser],
  createcomment
);

// GET 댓글 조회
router.get(ROUTES.VIEWALLCOMMENTS, readcomment);

// PUT 댓글 수정
router.put(
  ROUTES.UPDATECOMMENTS,
  [verifyToken, authenticateUser],
  updatecomment
);

export default router;
