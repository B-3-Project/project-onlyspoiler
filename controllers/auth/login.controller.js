import db from "../../models/index.cjs";
const { Users } = db;
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await handleLogin(email, password);
    const token = generateToken(user.id);

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

  return user;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = userId => {
  const expiresIn = "12h";
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn
  });
  return { accessToken, expiresIn };
};
