import express from "express";
import { ROUTES } from "../../constants/comments.constant.js";
import { createcomment } from "../../controllers/comments/comments.controller.js";
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

export default router;
