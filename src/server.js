import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Server is running on http://${process.env.HOST || "localhost"}:${port}`
  );
});
