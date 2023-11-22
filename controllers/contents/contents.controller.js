import db from "../../models/index.cjs";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
const { Contents, Users } = db;

export const createcontent = async (req, res) => {
  const { title, content } = req.body;

  // 상품 입력을 위한 id 가져오기
  const userId = res.locals.user.id;

  try {
    if (userId.length === 0) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.MISSING_USERID);
    }

    const createdProducts = await Contents.create({
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
        id: createdProducts.id,
        title: createdProducts.title,
        content: createdProducts.content,
        author: user ? user.name : null,
        createdAt: createdProducts.createdAt
      }
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      errerMessage: error
    });
  }
};
