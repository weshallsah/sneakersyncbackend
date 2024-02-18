import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";
import { Product } from "../models/product.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { Brand } from "../models/brandname.models.js";

const fetchproduct = AsyncHandler(async (req, res) => {
    console.log("reqest get");
    try {
        const product = await Product.aggregate([
            {
                $sort: {
                    field1: 1
                }
            }
        ]);
        return res.status(200).json(
            new ApiResponse(
                200,
                product,
                "fetch successful"
            )
        );
    } catch (error) {
        throw new ApiError(error.status, error.message, error);
    }
});

const fetchbrandname = AsyncHandler(async (req, res) => {
    try {
        // console.log("request sended");
        const name = await Brand.aggregate([
            {
                $sort: {
                    field1: 1
                }
            }
        ]);
        // console.log(name);/
        return res.status(200).json(
            new ApiResponse(
                200,
                name,
                "fetch successful"
            )
        );
    } catch (error) {
        // console.log(error.message);
        throw new ApiError(200, "something went wrong");
    }
});

export {
    fetchproduct,
    fetchbrandname,
}