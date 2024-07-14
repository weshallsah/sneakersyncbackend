import { Router } from "express";
import { login, register } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const routes = Router();

routes.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    register
);
routes.route("/login").post(
    upload.fields([]),
    login
)

export default routes;