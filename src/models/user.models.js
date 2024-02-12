import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        "Username": {
            type: String,
            require: true,
            uniq: true,
        },
        "email": {
            type: String,
            require: true,
            uniq: true,
        },
        "fullname": {
            type: String,
            require: true,
        },
        "phone": {
            type: Number,
            require: true,
        },
    },
    { timestamp: true });