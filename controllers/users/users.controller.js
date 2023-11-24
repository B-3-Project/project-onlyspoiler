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
        const userId = res.locals.user.Id;
        // const userId = res.locals.decoded.userId;

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
                id,
                username: user.username,
                description: user.description || '',
            },
        });
    } catch (err) {
        throw createError(
            StatusCodes.BAD_REQUEST,
            ErrorMessages.UNEXPECTED_ERROR
        )
    }
};


// 회원 정보 수정
export const putUserProfile = async (req, res) => {
    try {
        const userId = res.locals.user.Id;

        // const userId = res.locals.decoded.userId;
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
        throw createError(
            StatusCodes.BAD_REQUEST,
            ErrorMessages.UNEXPECTED_ERROR
        )
    }
};


// 비밀번호 수정
export const changePassword = async (req, res, next) => {
    try {
        const userId = res.locals.user.Id;

        // const userId = res.locals.decoded.userId;
        const { currentPassword, newPassword } = req.body;

        // 현재 비밀번호 확인
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

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await user.update({ password: hashedNewPassword });

        res.json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        throw createError(
            StatusCodes.BAD_REQUEST,
            ErrorMessages.UNEXPECTED_ERROR
        )
    }
}