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
import Stripe from "stripe";


app.get("/", async (req, res) => {
    console.log("requrest is here");
    const stripe = await Stripe(process.env.STRIPE_SECRET_KEY);
    const testproduct = await stripe.products.create({
        name: 'Starter Subscription',
        description: 'INR 12/Month subscription',
    }).then(async (product) => {
        await stripe.prices.create({
            unit_amount: 12,
            currency: 'INR',
            recurring: {
                interval: 'month',
            },
            product: product.id,
        }).then(price => {
            console.log('product', product);
            console.log("price ", price);
        });
    });
    return res.status(200).json(
        {
            "message": "ok"
        }
    );
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