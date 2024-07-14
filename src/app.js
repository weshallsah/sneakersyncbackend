import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.ORIGIN_PATH,
    credentials: true,
}));
app.use(express.json());

import userroutes from "./routes/user.routes.js";
import productroutes from "./routes/product.routes.js";
import cartroutes from "./routes/cart.routes.js";
import wishlist from "./routes/wishlist.routes.js";
import address from "./routes/Address.routes.js";
import paymentroutes from "./routes/payment.routes.js"
import path from "path";


app.get("/", async (req, res) => {
    res.sendFile(path.resolve("public/web/index.html"));
});
app.get("/api/v1/", (req, res) => {
    return res.status(200).json({
        message: "server is running"
    });
});
app.use("/api/v1/user", userroutes);
app.use("/api/v1/product", productroutes);
app.use("/api/v1/cart", cartroutes);
app.use("/api/v1/wishlist", wishlist);
app.use("/api/v1/address", address);
app.use("/api/v1/payment", paymentroutes);
export default app;