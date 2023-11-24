import { check, validationResult } from "express-validator";
import { createError } from "../../utils/errorResponse.js";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";

export const validateProfie = [];