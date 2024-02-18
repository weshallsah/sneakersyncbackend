import { ApiError } from "../utils/ApiError.utils.js";
import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js"
import uploadCloud from "../utils/cloudinary.utils.js";
import * as bcrypt from "bcrypt";

const register = AsyncHandler(async (req, res) => {
    try {
        const { username, email, fullname, password, phone } = req.body;

        if ([username, email, fullname, password, phone].some((value) => value?.trim() === "")) {
            throw new ApiError(400, "Invalid cradential");
        }
        console.log(req.body);
        console.log(username);
        const islogin = await User.findOne(
            {
                $or: [
                    { username },
                    { email },
                ],
            }
        );
        if (islogin) {
            throw new ApiError(401, "user alredy exits");
        }
        const user = await User.create({
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            phone: phone,
        });
        const credential = await User.findById(user._id).select(
            "-password"
        );
        if (!credential) {
            throw new ApiError("505", "server errror user not created");
        }
        return res.status(201).json(new ApiResponse(
            201,
            credential,
            "user created successfully",
        ));
    } catch (err) {
        throw new ApiError(505, err, err);
    }
});

const login = AsyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        console.log(username);
        const user = await User.findOne(
            {
                username
            }
        );
        if (!user) {
            throw new ApiError(404, "user does not exits");
        }
        const iscorrect = await user.ispasswrodcorrect(password);
        if (iscorrect) {
            throw new ApiError(402, "wrong password");
        }
        const credential = await User.findById(user._id).select('-password');
        return res.status(200).json(
            new ApiResponse(200, credential, "login successfull")
        );
    } catch (error) {
        throw new ApiError(505, error, error);
    }
});

export {
    register
    , login
}