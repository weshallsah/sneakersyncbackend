import { Router } from "express";
import { payment } from "../controller/payment.controller.js";

const routes = Router();

routes.route("/payment").post(
    payment
);

export default routes;