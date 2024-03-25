import { AsyncHandler } from "../utils/AsyncHandeler.utils.js"
import { Wishlist } from "../models/wishlist.models.js";
import { ApiError } from "../utils/ApiError.utils.js";


const createwishlist = AsyncHandler(async (req, res) => {
    try {
        const user = req.query.user;
        const product = req.query.product;
        // console.log(user);
        // console.log(product);
        const payload = await Wishlist.create({
            user: user,
            product: product
        });
        return res.status(200).json(
            "message successful"
        );
    } catch (error) {
        throw ApiError(error.status, error.message, error);
    }
});

const deletewishlist = AsyncHandler(async (req, res) => {
    try {
        const Id = req.query.id;
        await Wishlist.deleteOne({ _id: Id });
        return res.status(200).json(
            "successful"
        );
    } catch (error) {
        throw ApiError(error.status, error.message, error);
    }
});

export { createwishlist, deletewishlist };