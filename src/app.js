import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.ORIGIN_PATH,
    credentials: true,
}));
app.use(express.json());

import userroutes from "./routes/user.routes.js";
import productroutes from "./routes/product.routes.js"
import fs from "fs";

app.get("/", (req, res) => {
    const stream = fs.createReadStream("./src/sample.txt", "utf-8");
    stream.on("data", (chunk) => res.write(chunk));
    stream.on("end", () => res.end());
});

app.use("/api/v1/user", userroutes);
app.use("/api/v1/product", productroutes);

export default app;