import express from "express";
import { ApiResponse } from "./utils/ApiResponse.utils.js"
import { AsyncHandeller } from "./utils/AsyncHandeler.utils.js";
import { ApiError } from "./utils/ApiError.utils.js";

const app = express();



import userroutes from "./routes/user.routes.js";

app.use("/api/v1/user", userroutes);


export default app;