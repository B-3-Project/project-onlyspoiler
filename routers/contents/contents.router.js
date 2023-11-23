import express from "express";
import { ROUTES } from "../../constants/contents.constant.js";
import {
  createcontent,
  readcontent,
  readDetcontent
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

// POST 게시물 전체조회
router.get(ROUTES.VIEWALLPOSTS, readcontent);

// POST 게시물 상세조회
router.get(ROUTES.VIEWDETAILPOST, readDetcontent);

export default router;
