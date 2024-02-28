import mongoose from "mongoose";


const sellerSchema = mongoose.Schema(
    {
        "seller": {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        "product":
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        }

    }
);

export const Seller = mongoose.model("Seller", sellerSchema);