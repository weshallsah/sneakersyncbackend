import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js"
import { addAddress, getaddress } from "../controller/address.controller.js";


const router = Router();

router.route("/addadress").post(
    // upload.fields(),
    addAddress
);
router.route("/getadress").get(
    // upload.fields(),
    getaddress
);
export default router;