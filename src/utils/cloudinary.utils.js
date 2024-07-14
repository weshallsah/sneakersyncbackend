import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from './ApiError.utils.js';
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });
// console.log(process.env.API_KEY);
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadCloud = async (localfile) => {
    try {
        if (!localfile) {
            return null;
        }
        const res = await cloudinary.uploader.upload(localfile,
            {
                resource_type: "auto"
            }
        );
        fs.unlinkSync(localfile);
        return res;
    } catch (error) {
        fs.unlinkSync(localfile);
        console.log('error occure', error);
        new ApiError(error);
        return null;
    }
};

export default uploadCloud;