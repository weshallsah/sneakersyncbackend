import { Router } from "express";
import { fetchbrandname, fetchproduct } from "../controller/product.controller.js";


const routes = Router();

routes.route("/fetchproduct").get(
    fetchproduct
);
routes.route("/fetchbrandnames").get(
    fetchbrandname
)

export default routes;