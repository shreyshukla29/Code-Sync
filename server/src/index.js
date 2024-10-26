import express from "express";
import connect from "./config/db.config.js";
import ServerConfig from "./config/server.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log(process.env.PORT);
app.listen(ServerConfig.PORT, async () => {
  console.log(`Server started on port ${ServerConfig.PORT}...`);
});

connect();
