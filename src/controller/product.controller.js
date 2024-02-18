import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";
import { Product } from "../models/product.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";

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
        res.status(200).json(
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

export {
    fetchproduct,
}