import { Router } from "express";
import { createCart, getCart, updatecart } from "../controller/cart.controller.js";


const routes = Router();

routes.route("/getcart").get(
    getCart
);
routes.route("/updatecart").get(
    updatecart
)
routes.route("/addcart").post(
    createCart
)

export default routes;