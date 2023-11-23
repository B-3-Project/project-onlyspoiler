import express from "express";
import { ROUTES } from "../../constants/contents.constant.js";
import {
  createcontent,
  readcontent,
  readDetcontent,
  updateDetcontent
} from "../../controllers/contents/contents.controller.js";
import { chkCreateContent } from "../../validates/contents/createcontents.validate.js";
import {
  authenticateUser,
  verifyToken
} from "../../middlewares/auth/auth.middleware.js";

const router = express.Router();

// POST 게시물 등록
router.post(
  ROUTES.VIEWALLPOSTS,
  [chkCreateContent, verifyToken, authenticateUser],
  createcontent
);

// GET 게시물 전체조회
router.get(ROUTES.VIEWALLPOSTS, readcontent);

// GET 게시물 상세조회
router.get(ROUTES.VIEWDETAILPOST, readDetcontent);

// PUT 게시물 수정
router.put(
  ROUTES.VIEWDETAILPOST,
  [verifyToken, authenticateUser],
  updateDetcontent
);

export default router;
