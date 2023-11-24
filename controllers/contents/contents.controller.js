import db from "../../models/index.cjs";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
const { Contents, Users } = db;

// 게시물 생성
export const createcontent = async (req, res) => {
  const { title, content } = req.body;

  // 게시물 생성을 위한 id 가져오기
  const userId = res.locals.user.id;

  try {
    if (userId.length === 0) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.MISSING_USERID);
    }

    const createContent = await Contents.create({
      title,
      content,
      author_id: userId
    });

    // Users 테이블에서 해당 사용자의 name 값 가져오기
    const user = await Users.findOne({
      where: { id: userId },
      attributes: ["name"] // 가져올 속성 지정
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: SuccessMessages.CONTENT_SUCCESS,
      data: {
        id: createContent.id,
        title: createContent.title,
        content: createContent.content,
        author: user ? user.name : null,
        createdAt: createContent.createdAt
      }
    });
  } catch (error) {
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorMessages.SERVER_ERROR + " " + error
    );
  }
};

// 게시물 전체조회
export const readcontent = async (req, res) => {
  const { sort } = req.query;

  let sortText = sort && sort.toUpperCase() === "ASC" ? "ASC" : "DESC"; //default 최신순
  let sortOption = [["createdAt", sortText]];

  try {
    const user = await Users.findAll({});
    const userList = user.map(item => ({
      id: item.id,
      name: item.name
    }));

    const contentsList = await Contents.findAll({
      order: sortOption // Query String에 따라 대문자로 받아 정렬 방식 변경
    });

    // 이후 데이터 가공 및 반환
    const resultList = contentsList.map(item => ({
      id: item.id,
      author_id: item.author_id,
      title: item.title,
      content: item.content,
      author: null,
      createdAt: item.createdAt
    }));

    // resultArray의 각 요소에 대해 반복
    resultList.forEach(item => {
      // userList에서 userId와 일치하는 id를 가진 사용자 찾기
      const user = userList.find(user => user.id === Number(item.author_id));

      // userList에서 찾은 사용자의 nickname을 resultList nickname으로 변경
      if (user) {
        item.author = user.name;
      }

      // userId 속성 삭제(조회 안되도 되는 정보)
      delete item.author_id;
    });

    res.json({
      success: true,
      message: SuccessMessages.READ_SUCCESS,
      data: resultList
    });
  } catch (error) {
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorMessages.SERVER_ERROR + " " + error
    );
  }
};

// 게시물 상세조회
export const readDetcontent = async (req, res) => {
  const { Id } = req.params;

  try {
    const users = await Users.findAll({});
    const userList = users.map(item => ({
      id: item.id,
      name: item.name
    }));
    const existsContent = await Contents.findOne({ where: { id: Id } });

    if (existsContent === null) {
      return failResponseMsg(
        res,
        StatusCodes.BAD_REQUEST,
        ErrorMessages.MISSING_USERID
      );
    }

    userList.forEach(x => {
      console.log(x);
    });

    const user = userList.find(user => user.id === existsContent.author_id);

    const resultList = {
      id: existsContent.id,
      title: existsContent.title,
      content: existsContent.content,
      author: user ? user.name : "탈퇴자",
      createdAt: existsContent.createdAt
    };

    if (resultList !== null) {
      return res.json({
        success: true,
        message: SuccessMessages.READDET_SUCCESS,
        data: resultList
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        errorMessage: ErrorMessages.MISSINGDET_CONTENT
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      sucess: false,
      errerMessage: ErrorMessages.SERVER_ERROR + error
    });
  }
};

// 게시물 수정
export const updateDetcontent = async (req, res) => {
  const { Id } = req.params;
  const { title, content } = req.body;

  try {
    const existsContent = await Contents.findOne({ where: { id: Id } });
    const userIdCHhk = res.locals.user.id;

    //productId 공백 확인!!
    if (existsContent === null) {
      return failResponseMsg(
        res,
        StatusCodes.BAD_REQUEST,
        ErrorMessages.MISSING_USERID
      );
    }

    // 사용자iD 일치여부
    if (Number(existsContent.author_id) === userIdCHhk) {
      //Products 테이블과 res.locals.user 비교
      await Contents.update(
        { title, content },
        {
          where: { id: Id }
        }
      );

      const updateContent = await Contents.findOne({ where: { id: Id } });

      return res.json({
        success: true,
        message: SuccessMessages.UPDATE_SUCCESS,
        data: updateContent
      });
    } else {
      return failResponseMsg(
        res,
        StatusCodes.UNAUTHORIZED,
        ErrorMessages.UNAUTHORIZED_CONTENT
      );
    }
  } catch (error) {
    return failResponseMsg(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorMessages.SERVER_ERROR + error
    );
  }
};

// 게시물 삭제
export const deleteDetcontent = async (req, res) => {
  const { Id } = req.params;
  const existsContent = await Contents.findOne({ where: { id: Id } });
  const userIdCHhk = res.locals.user.id;

  try {
    //productId 공백 확인
    if (existsContent === null) {
      return failResponseMsg(
        res,
        StatusCodes.BAD_REQUEST,
        ErrorMessages.MISSING_USERID
      );
    }

    // 사용자ID 일치여부
    if (Number(existsContent.author_id) === userIdCHhk) {
      //Contents 테이블과 res.locals.user 비교
      // 삭제 진행
      await Contents.destroy({ where: { id: Id } });

      return res.json({
        success: true,
        message: SuccessMessages.DELETE_SUCCESS
      });
    } else {
      return failResponseMsg(
        res,
        StatusCodes.UNAUTHORIZED,
        ErrorMessages.UNAUTHORIZED_CONTENT
      );
    }
  } catch (error) {
    return failResponseMsg(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorMessages.SERVER_ERROR + error
    );
  }
};

const failResponseMsg = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message
  });
};
