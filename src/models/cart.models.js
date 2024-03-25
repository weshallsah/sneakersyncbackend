import mongoose from "mongoose";


const Cartshema = mongoose.Schema(
    {
        "product":
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        "user": {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        "qty": {
            type: Number,
            default: 1
        },
        "size": {
            type: Number,
            default: 10
        }
    }, { timestamps: true, });

export const Cart = mongoose.model("Cart", Cartshema);