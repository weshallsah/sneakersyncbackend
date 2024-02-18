import mongoose from "mongoose";


const BrandSchema = mongoose.Schema({
    "brand_name": {
        type: String
    }
});

export const Brand = mongoose.model("Brand", BrandSchema);

