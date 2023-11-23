import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../../models/index.cjs";
const { Users } = db;

// 상태/에러 메세지 연결
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";


export const getUserProfile = async (req, res) => {
    try {
        const userId = res.locals.decoded.userId;
        const user = await Users.findByPk(userId);

        if (!user) {
            throw createError(
                StatusCodes.BAD_REQUEST,
                ErrorMessages.INVALID_LOGIN_INFO
            );
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: SuccessMessages.PROFILE_LODING_CUCCESS,
            data: {
                id: user.id,
                username: user.username,
                description: user.description || '',
            },
        });
    } catch (err) {
        next(err);
    }
};