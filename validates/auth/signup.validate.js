import { check, validationResult } from "express-validator";
import { createError } from "../../utils/errorResponse.js";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";

export const validateSignup = [
  check("email")
    .exists()
    .withMessage(ErrorMessages.MISSING_EMAIL)
    .notEmpty()
    .withMessage(ErrorMessages.MISSING_EMAIL)
    .isEmail()
    .withMessage(ErrorMessages.INVALID_EMAIL),
  check("password")
    .exists()
    .withMessage(ErrorMessages.MISSING_PASSWORD)
    .notEmpty()
    .withMessage(ErrorMessages.MISSING_PASSWORD)
    .isLength({ min: 6 })
    .withMessage(ErrorMessages.SHORT_PASSWORD),
  check("passwordConfirm")
    .exists()
    .withMessage(ErrorMessages.MISSING_PASSWORD)
    .notEmpty()
    .withMessage(ErrorMessages.MISSING_PASSWORD)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(ErrorMessages.PASSWORD_MISMATCH);
      }
      return true;
    }),
  check("name")
    .exists()
    .withMessage(ErrorMessages.MISSING_NAME)
    .notEmpty()
    .withMessage(ErrorMessages.MISSING_NAME),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(StatusCodes.BAD_REQUEST, errors.array()[0].msg));
    }
    next();
  }
];
