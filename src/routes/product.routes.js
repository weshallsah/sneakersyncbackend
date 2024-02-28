import { Router } from "express";
import { fetchbrandname, fetchproduct, fetchproducts, fetchproducttype } from "../controller/product.controller.js";


const routes = Router();

routes.route("/fetchproducttype").get(
    fetchproducttype
);
routes.route("/fetchproduct").get(
    fetchproduct
);
routes.route("/fetchproducts").get(
    fetchproducts
);
routes.route("/fetchbrandnames").get(
    fetchbrandname
);

export default routes;