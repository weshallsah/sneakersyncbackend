import { Router } from "express";
import { fetchproduct } from "../controller/product.controller.js";


const routes = Router();

routes.route("/fetchproduct").get(
    fetchproduct
);

export default routes;