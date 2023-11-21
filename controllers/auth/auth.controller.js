import db from "../../models/index.cjs";
import { StatusCodes } from "../../constants/statusCodes.constant.js";
const { Users } = db;

export const signup = async (req, res, next) => {
  const { email, password, passwordConfirm, name } = req.body;

  const existingUser = await Users.findOne({
    where: {
      email
    }
  });

  if (existingUser) {
    return;
  }

  const user = await Users.create({
    email,
    password,
    name
  });

  const { password: _, ...userWithoutPassword } = user.get();

  res.status(StatusCodes.OK).json({
    message: "성공",
    data: userWithoutPassword
  });
};
