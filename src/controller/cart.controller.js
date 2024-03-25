import mongoose from "mongoose";
import { Cart } from "../models/cart.models.js";
import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";

const createCart = AsyncHandler(async (req, res) => {
    const { user, product, qty, size } = req.body;
    const payload = await Cart.create({
        user: user,
        product: product,
        qty: qty,
        size: size
    });
    return res.status(200).json({
        "message": "successfully added"
    });
});

const getCart = AsyncHandler(async (req, res) => {
    const userID = req.query.userID;
    const payload = await Cart.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userID)
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "cartproduct",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            image: 1,
                            price: 1,
                            count: 1,
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$cartproduct"
        },
        {
            $project: {
                cartproduct: 1,
                qty: 1,
                size: 1,
            }
        }
    ]);
    return res.status(200).json(
        new ApiResponse(
            200,
            payload,
            "sucessful"
        )
    );
});

// 

const updatecart = AsyncHandler(async (req, res) => {
    try {
        const docID = req.query.docID;
        const qty = req.query.qty;
        if (qty == 0) {
            const payload = await Cart.deleteOne({ _id: docID });
            console.log(payload);
            return res.status(200).json({
                message: "ok",
                payload
            });
        }

        const payload = await Cart.findById(docID);
        payload['qty'] = qty;
        payload.save();
        return res.status(200).json({
            message: "ok",
            payload
        });
    } catch (error) {
        throw new ApiError(error.status, error.message, error);
    }
});

const checkout = AsyncHandler(async (req, res) => {

});

export { getCart, checkout, updatecart, createCart };