import { ApiError } from "../utils/ApiError.utils.js";
import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js"
import uploadCloud from "../utils/cloudinary.utils.js";

const register = AsyncHandler(async (req, res) => {
    try {
        const { username, email, fullname, password, phone } = req.body;

        if ([username, email, fullname, password, phone].some((value) => value?.trim() === "")) {
            throw new ApiError(400, "Invalid cradential");
        }
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
        const avatar = await req.files?.avatar[0]?.path;
        let avatarurl = "";
        if (avatar != "") {
            avatarurl = await uploadCloud(avatar);
        }
        // console.log(avatarurl.url);
        const user = await User.create({
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            phone: phone,
            avatar: avatarurl.url ?? "",
        });
        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "succesful"
            )
        );
    } catch (err) {
        throw new ApiError(505, err, err);
    }
});

export {
    register
}