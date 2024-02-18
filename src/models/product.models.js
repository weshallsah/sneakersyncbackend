import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

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
        "brand": {
            type: mongoose.Types.ObjectId,
            ref: "Brand"
        },
        "image": {
            type: String,
            required: true,
        }
    },
    { timestamp: true }
);

export const Product = mongoose.model("Product", ProductSchema);