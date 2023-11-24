import db from "../../models/index.cjs";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
const { Comments, Users } = db;

// 댓글 생성
export const createcomment = async (req, res) => {
  const { comments } = req.body;
  const { Id } = req.params;

  // 게시물 생성을 위한 id 가져오기
  const userId = res.locals.user.id;

  try {
    if (userId.length === 0) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.MISSING_USERID);
    }

    const createComment = await Comments.create({
      contents_id: Id,
      user_id: userId,
      comments
    });

    // Users 테이블에서 해당 사용자의 name 값 가져오기
    const user = await Users.findOne({
      where: { id: userId },
      attributes: ["name"] // 가져올 속성 지정
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: SuccessMessages.COMMENT_SUCCESS,
      data: {
        id: createComment.id,
        comments: createComment.comments,
        author: user ? user.name : null,
        createdAt: createComment.createdAt
      }
    });
  } catch (error) {
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorMessages.SERVER_ERROR + " " + error
    );
  }
};

// 댓글 조회

// 댓글 수정 (댓글 작성자만 가능하도록)

// 댓글 삭제 (댓글 작성자만 가능하도록)
