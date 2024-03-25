import mongoose from "mongoose";

const AdressSchema = mongoose.Schema(
    {
        "user": {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        "Name": {
            type: String,
            require: true,
        },
        "Address1": {
            type: String,
            require: true,
        },
        "Address2": {
            type: String,
            require: true,
        },
        "Address3": {
            type: String,
        },
        "pincode": {
            type: String,
            require: true,
        },
        "country": {
            type: String,
        },
        "state": {
            type: String,
        },
        "phone": {
            type: String,
        },
        "Email": {
            type: String,
        }
    },
    {
        timestamps: true
    },
);

export const Address = mongoose.model("Address", AdressSchema);