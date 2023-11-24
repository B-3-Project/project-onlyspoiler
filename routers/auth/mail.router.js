import express from "express";
import db from "../../models/index.cjs";
const { Users } = db;
import jwt from "jsonwebtoken";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
import { ErrorMessages } from "../../constants/errorMessage.constant.js";

const router = express.Router();

router.get("/verify-email", async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);

    await Users.update({ verified: true }, { where: { id: decoded.userId } });

    res.send("Email verified");
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(ErrorMessages.INVALID_TOKEN);
  }
});

export default router;
