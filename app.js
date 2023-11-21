import express from "express";
import { SERVER_PORT } from "./constants/app.constant.js";
import authRouter from "./routers/auth/auth.router.js";
import { handleServerError } from "./middlewares/handleServerError.middleware.js";

const app = express();
app.use(express.json());

app.use("/api", authRouter);
app.use(handleServerError);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://localhost:${SERVER_PORT}`);
});
