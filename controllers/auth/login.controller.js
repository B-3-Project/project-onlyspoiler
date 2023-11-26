import db from "../../models/index.cjs";
const { Users, RefreshTokens } = db;
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await handleLogin(email, password);

    await RefreshTokens.destroy({ where: { user_id: user.id } });

    const token = await generateToken(user.id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: SuccessMessages.LOGIN_SUCCESS,
      data: {
        ...token,
        userId: user.id
      }
    });
  } catch (err) {
    next(err);
  }
};

const handleLogin = async (email, password) => {
  const user = await Users.findOne({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      ErrorMessages.INVALID_LOGIN_INFO
    );
  }

  if (!user.verified) {
    throw createError(StatusCodes.UNAUTHORIZED, ErrorMessages.UNVERIFIED_EMAIL);
  }

  return user;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
