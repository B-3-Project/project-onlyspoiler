import express from "express";
import { SERVER_PORT } from "./constants/app.constant.js";
import authRouter from "./routers/auth/auth.router.js";

const app = express();
app.use(express.json());

app.use("/api", authRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://localhost:${SERVER_PORT}`);
});
