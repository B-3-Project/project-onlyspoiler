import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../../models/index.cjs";
// import { hashPassword } from "../../models/users.cjs";
const { Users } = db;

// 상태/에러 메세지 연결
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
import { SuccessMessages } from "../../constants/successMessage.constant.js";
import { createError } from "../../utils/errorResponse.js";

// 회원 정보 조회
export const getUserProfile = async (req, res, next) => {
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
            message: SuccessMessages.PROFILE_LODING_SUCCESS,
            data: {
                id: userId,
                username: user.name,
                description: user.description || ""
            }
        });
    } catch (err) {
        next(err);
    }
};

// 회원 정보 수정
export const putUserProfile = async (req, res, next) => {
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
                id: userId,
                username: updateUser.name,
                description: updateUser.description || ""
            }
        });
    } catch (err) {
        next(err);
    }
};

// 비밀번호 수정
export const changePassword = async (req, res, next) => {
    try {
        const userId = res.locals.decoded.userId;
        const { currentPassword, newPassword } = req.body;

        const user = await Users.findByPk(userId);
        if (!user) {
            throw createError(
                StatusCodes.BAD_REQUEST,
                ErrorMessages.INVALID_USER_INFO
            );
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            throw createError(
                StatusCodes.UNAUTHORIZED,
                ErrorMessages.INVALID_CURRENT_PASSWORD
            );
        }

        const hashedNewPassword = await hashPassword({ password: newPassword });

        await user.update({ password: hashedNewPassword });

        res.status(StatusCodes.OK).json({
            success: true,
            message: SuccessMessages.PASSWORD_MODIFY_SUCCESS
        });
    } catch (err) {
        next(err);
    }
};
