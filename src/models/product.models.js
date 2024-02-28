import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        "name": {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        "description": {
            type: String,
        },
        "price": {
            type: Number,
            required: true,
        },
        "count": {
            type: Number,
            required: true,
        },
        "brand": {
            type: mongoose.Types.ObjectId,
            ref: "Brand"
        },
        "coverimage": {
            type: String,
            required: true,
        },
        "productimage": [
            {
                type: String,
            }
        ],
    },
    { timestamp: true }
);

export const Product = mongoose.model("Product", ProductSchema);