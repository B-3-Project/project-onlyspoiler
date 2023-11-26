import express from "express";
import { SERVER_PORT } from "./constants/app.constant.js";
import authRouter from "./routers/auth/auth.router.js";
import contentsRouter from "./routers/contents/contents.router.js";
import commentsRouter from "./routers/comments/comments.router.js";
import mailRouter from "./routers/auth/mail.router.js";
import socialRouter from "./routers/auth/socialLogin.router.js";
import { handleServerError } from "./middlewares/handleServerError.middleware.js";

const app = express();
app.use(express.json());
app.use(express.static("."));


app.use("/api", [authRouter, contentsRouter, mailRouter, socialRouter, commentsRouter]);
app.use(handleServerError);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://localhost:${SERVER_PORT}`);
});
