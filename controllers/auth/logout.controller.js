import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import db from "../../models/index.cjs";
const { RefreshTokens } = db;

export const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    await RefreshTokens.destroy({ where: { token: refreshToken } });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: SuccessMessages.LOGOUT_SUCCESS
    });
  } catch (err) {
    next(err);
  }
};
