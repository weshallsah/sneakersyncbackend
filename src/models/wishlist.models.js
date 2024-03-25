import mongoose from "mongoose";

const WishlistSchema = mongoose.Schema(
    {
        "user": {
            type: mongoose.Types.ObjectId,
            Ref: "User"
        },
        "product": {
            type: mongoose.Types.ObjectId,
            Ref: "Product"
        }
    },
    {
        timestamps: true
    }
);

export const Wishlist = mongoose.model("Wishlist", WishlistSchema);