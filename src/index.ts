import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routers/auth";
import { MONGO_CONNECTION_LINK, PORT } from "./helpers/common";
import { collectionRouter, fieldRouter } from "./routers/collection";
import cors from "cors";
import { commentRouter } from "./routers/comment";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/collection", collectionRouter);
app.use("/field", fieldRouter);
app.use("/comment", commentRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_LINK);
    app.listen(PORT, () => console.log("server started", PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
