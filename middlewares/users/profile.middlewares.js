import jwt from "jsonwebtoken";
import db from "../../models/index.cjs";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";
const { Users } = db;

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendUnauthorizedResponse(res, ErrorMessages.MISSING_TOKEN);
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.locals.decoded = decoded;

        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return sendUnauthorizedResponse(res, ErrorMessages.TOKEN_EXPIRED);
        } else if (err instanceof jwt.JsonWebTokenError) {
            return sendUnauthorizedResponse(
                res,
                ErrorMessages.TOKEN_VERIFICATION_FAILED
            );
        } else {
            next(err);
        }
    }
};

// 사용자 유효성 검사
const authenticateUser = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: { id: res.locals.decoded.userId }
        });
        if (!user) {
            return sendUnauthorizedResponse(res, ErrorMessages.INVALID_USER);
        }

        res.locals.user = user;

        next();
    } catch (err) {
        next(err);
    }
};

const sendUnauthorizedResponse = (res, message) => {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: message
    });
};

export { verifyToken, authenticateUser };
