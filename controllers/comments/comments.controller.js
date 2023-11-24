import db from "../../models/index.cjs";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
const { Comments, Contents, Users } = db;

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

    // Comments 테이블에서 해당 사용자의 정보 가져오기
    const content = await Contents.findOne({
      where: { id: Id }
    });

    if (!content) {
      return failResponseMsg(
        res,
        StatusCodes.BAD_REQUEST,
        ErrorMessages.MISSING_CONTENTID
      );
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
export const readcomment = async (req, res) => {
  const { sort } = req.query;
  const { Id } = req.params;

  let sortText = sort && sort.toUpperCase() === "ASC" ? "ASC" : "DESC"; //default 최신순
  let sortOption = [["createdAt", sortText]];

  try {
    const user = await Users.findAll({});
    const userList = user.map(item => ({
      id: item.id,
      name: item.name
    }));

    const commentsList = await Comments.findAll({
      where: {
        contents_id: Id // 여기서 Id는 어떻게 설정되는지에 따라 적절히 사용
      },

      order: sortOption // Query String에 따라 대문자로 받아 정렬 방식 변경
    });

    // 이후 데이터 가공 및 반환
    const resultList = commentsList.map(item => ({
      id: item.id,
      user_id: item.user_id,
      comments: item.comments,
      author: null,
      createdAt: item.createdAt
    }));

    resultList.forEach(item => {
      // userList에서 userId와 일치하는 id를 가진 사용자 찾기
      const user = userList.find(user => user.id === Number(item.user_id));

      // userList에서 찾은 사용자의 name을 resultList name으로 변경
      if (user) {
        item.author = user.name;
      }

      // userId 속성 삭제(조회 안되도 되는 정보)
      delete item.user_id;
    });

    res.json({
      success: true,
      message: SuccessMessages.COMMENT_READ_SUCCESS,
      data: resultList
    });
  } catch (error) {
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorMessages.SERVER_ERROR + " " + error
    );
  }
};

// 댓글 수정 (댓글 작성자만 가능하도록)

// 댓글 삭제 (댓글 작성자만 가능하도록)

const failResponseMsg = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message
  });
};
