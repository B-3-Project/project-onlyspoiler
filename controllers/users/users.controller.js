import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../../models/index.cjs";
const { Users } = db;

// 상태/에러 메세지 연결
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";

// 회원 정보 조회
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
                id,
                username: user.username,
                description: user.description || '',
            },
        });
    } catch (err) {
        next(err);
    }
};


// 회원 정보 수정
export const putUserProfile = async (req, res) => {
    try {
        const userId = res.locals.decoded.userId;
        const { name, email, description } = req.body;

        const [updateProfile] = await Users.update(
            { username: name, email, description },
            { where: { id: userId } }
        );

        if (updateProfile === 0) {
            throw createError(
                StatusCodes.NOT_FOUND,
                ErrorMessages.PRORILE_NOT_MODIFY
            );
        }

        const updateUser = await Users.findByPk(userId);

        res.status(StatusCodes.OK).json({
            success: true,
            message: SuccessMessages.PROFILE_MODIFY_SUCCESS,
            data: {
                id,
                username: updateUser.username,
                description: updateUser.description || '',
            },
        });
    } catch (err) {
        next(err);
    }
};