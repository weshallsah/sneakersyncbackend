import { Router } from "express";
import { createwishlist, deletewishlist } from "../controller/wishlist.controller.js";

const Routes = Router();

Routes.route("/addtowishlist").get(
    createwishlist
);

Routes.route("/deletewishlist").get(
    deletewishlist
);

export default Routes;