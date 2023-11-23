import db from "../../models/index.cjs";
const { Users } = db;
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";
import sendMail from "../../utils/mailer.js";
import { generateVerificationToken } from "../../utils/token.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  const existingUser = await Users.findOne({
    where: { email }
  });

  if (existingUser) {
    return next(
      createError(StatusCodes.CONFLICT, ErrorMessages.ALREADY_REGISTERED)
    );
  }

  const user = await Users.create({
    email,
    password,
    name,
    verified: false
  });

  const verificationToken = generateVerificationToken(user.id);
  const url = `http://localhost:3006/api/verify-email?token=${verificationToken}`;

  const mailOption = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: ${url}`
  };

  await sendMail(mailOption);

  const { password: _, ...userWithoutPassword } = user.get();

  res.status(StatusCodes.OK).json({
    success: true,
    message: SuccessMessages.SIGNUP_SUCCESS,
    data: userWithoutPassword
  });
};
