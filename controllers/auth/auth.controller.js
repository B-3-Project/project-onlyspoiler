import db from "../../models/index.cjs";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
const { Users } = db;

export const signup = async (req, res, next) => {
  const { email, password, passwordConfirm, name } = req.body;

  const existingUser = await Users.findOne({
    where: {
      email
    }
  });

  if (existingUser) {
    return next(
      createError(StatusCodes.CONFLICT, ErrorMessages.ALREADY_REGISTERED)
    );
  }

  const user = await Users.create({
    email,
    password,
    name
  });

  const { password: _, ...userWithoutPassword } = user.get();

  res.status(StatusCodes.OK).json({
    message: SuccessMessages.SIGNUP_SUCCESS,
    data: userWithoutPassword
  });
};
