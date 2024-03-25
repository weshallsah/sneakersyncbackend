import mongoose from "mongoose";
import { Address } from "../models/adress.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";

const addAddress = AsyncHandler(
    async (req, res) => {
        const { user, Name, Address1, Address2, Address3, pincode, country, state, phone, Email } = req.body;
        // console.log(req.body);
        const payload = await Address.create(
            {
                user: user,
                Name: Name,
                Address1: Address1,
                Address2: Address2,
                Address3: Address3,
                pincode: pincode,
                country: country,
                state: state,
                phone: phone,
                Email: Email
            }
        );
        // console.log(payload);
        return res.status(200).json(
            new ApiResponse(
                200,
                payload,
                "address is added successful"
            )
        );
    }
);

const getaddress = AsyncHandler(
    async (req, res) => {
        const { user } = req.query;
        // console.log(user);
        const payload = await Address.aggregate(
            [
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(user)
                    }
                },
                {
                    $sort: {
                        updatedAt: -1,
                    }
                }
            ]
        );
        return res.status(200).json(
            new ApiResponse(
                200,
                payload,
                "address get successfully"
            )
        );
    }
);

export {
    addAddress,
    getaddress
};