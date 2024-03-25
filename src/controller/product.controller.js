import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";
import { Product } from "../models/product.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { Brand } from "../models/brandname.models.js";
import fs, { createReadStream } from "fs";
import mongoose, { Mongoose } from "mongoose";
import { Wishlist } from "../models/wishlist.models.js";



const fetchproduct = AsyncHandler(async (req, res) => {
    const { id, user } = req.query;
    // console.log(user);
    const product = await Product
        .aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "sneakerhead",
                    foreignField: "_id",
                    as: "sneakerhead",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                            }
                        },
                    ]
                },
            },
            {
                $unwind: "$sneakerhead"
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand_name",
                    pipeline: [
                        {
                            $project: {
                                brand_name: 1,
                            }
                        },
                    ]
                },

            },
            {
                $unwind: "$brand_name"
            },
            {
                $lookup: {
                    from: "wishlists",
                    localField: "_id",
                    foreignField: "product",
                    as: "result",
                },

            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    description: 1,
                    image: 1,
                    material: 1,
                    brand_name: 1,
                    count: 1,
                    type: 1,
                    gender: 1,
                    sneakerhead: 1,
                    "fav": {
                        $in: [new mongoose.Types.ObjectId(user), "$result.user"]
                    }
                }
            }
        ]);
    return res.status(200).json(
        new ApiResponse(200, product, "ok")
    )
});

const fetchproducttype = AsyncHandler(async (req, res) => {
    try {
        const type = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    uniqueValues: {
                        $addToSet: "$type"
                    }
                }
            }
        ]);
        return res.status(200).json(
            new ApiResponse(
                200,
                type,
                "product fetch successful"
            )
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(501, "something went wrong");
    }
});

const fetchproducts = AsyncHandler(async (req, res) => {
    try {
        const page = req.query.page;
        const typename = req.query.type;
        const skip = (page - 1) * 5;
        console.log(skip);
        const products = await Product.aggregate([
            {
                $match: {
                    type: typename
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: 5
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    image: 1,
                    count: 1,
                }
            }
        ]);
        // console.log(products);
        return res.status(200).json(
            new ApiResponse(
                200,
                products,
                "fetch successful"
            )
        );

    } catch (error) {
        throw new ApiError(error.status, error.message, error);
    }
});

const fetchbrandname = AsyncHandler(async (req, res) => {
    try {
        const name = await Brand.aggregate([
            {
                $sort: {
                    field1: 1
                }
            }
        ]);
        return res.status(200).json(
            new ApiResponse(
                200,
                name,
                "fetch successful"
            )
        );
    } catch (error) {
        throw new ApiError(200, "something went wrong");
    }
});

export {
    fetchproduct,
    fetchproducts,
    fetchbrandname,
    fetchproducttype,
}