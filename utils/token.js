import db from "../models/index.cjs";
const { Users, RefreshTokens } = db;
import jwt from "jsonwebtoken";
import { createError } from "./errorResponse.js";
import { StatusCodes } from "../constants/statusCodes.constant.js";
import { ErrorMessages } from "../constants/errorMessage.constant.js";
import { SuccessMessages } from "../constants/successMessage.constant.js";
import ms from "ms";

export const generateToken = async userId => {
  const accessExpiresIn = "1h";
  const refreshExpiresIn = "7d";

  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: accessExpiresIn
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: refreshExpiresIn
  });

  await RefreshTokens.create({
    user_id: userId,
    token: refreshToken,
    expires_in: new Date(Date.now() + ms(refreshExpiresIn))
  });

  return {
    accessToken,
    accessExpiresIn,
    refreshToken,
    refreshExpiresIn
  };
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const storedToken = await RefreshTokens.findOne({
      where: { token: refreshToken },
      include: "user"
    });

    if (!storedToken || storedToken.user.id !== decoded.userId) {
      throw createError(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_TOKEN);
    }

    await RefreshTokens.destroy({
      where: { token: refreshToken }
    });

    const user = await Users.findOne({ where: { id: decoded.userId } });

    if (!user) {
      throw createError(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_USER);
    }

    const newToken = await generateToken(user.id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: SuccessMessages.TOKEN_REFRESH_SUCCESS,
      data: {
        ...newToken,
        userId: user.id
      }
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err = createError(StatusCodes.UNAUTHORIZED, ErrorMessages.TOKEN_EXPIRED);
    } else {
      err = createError(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_TOKEN);
    }
    next(err);
  }
};
