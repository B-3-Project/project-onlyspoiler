import { check, validationResult } from "express-validator";
import { createError } from "../../utils/errorResponse.js";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";

export const chkCreateContent = [
  check("title")
    .exists()
    .withMessage(ErrorMessages.MISSING_TITLE)
    .notEmpty()
    .withMessage(ErrorMessages.MISSING_TITLE),
  check("content")
    .exists()
    .withMessage(ErrorMessages.MISSING_CONTENT)
    .notEmpty()
    .withMessage(ErrorMessages.MISSING_CONTENT),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(StatusCodes.BAD_REQUEST, errors.array()[0].msg));
    }
    next();
  }
];
