import { Router } from "express";
import { register } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const routes = Router();

routes.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
    ]),
    register
);

export default routes;