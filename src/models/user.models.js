import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema(
    {
        "username": {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        "email": {
            type: String,
            required: true,
            unique: true,
        },
        "password": {
            type: String,
            required: [true, "please enter password"],
        },
        "fullname": {
            type: String,
            requiredd: true,
        },
        "phone": {
            type: Number,
            required: true,
        },
        "avatar": {
            type: String,
        }
    },
    { timestamp: true }
);

UserSchema.pre("save", async function (error, req, res, next) {
    if (!this.isModified("password")) {
        return next;
    }
    this.password = bcrypt.hashSync(this.password, 10);

    next;
});
UserSchema.methods.ispasswrodcorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", UserSchema);