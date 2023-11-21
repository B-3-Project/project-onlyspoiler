import { ErrorMessages } from "../constants/errorMessage.constant.js";
import { StatusCodes } from "../constants/statusCodes.constant.js";

export const handleServerError = (err, req, res, next) => {
  console.log(err);
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ErrorMessages.SERVER_ERROR;
  res.status(status).json({ error: { message } });
};
