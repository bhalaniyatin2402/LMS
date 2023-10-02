import { Router } from "express";
const router = Router();
import {
  checkout,
  getApiKey,
  verify,
} from "../controller/payment.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

router.route("/getkey").get(isLoggedIn, getApiKey);

router.route("/checkout").post(isLoggedIn, checkout);

router.route("/verify").post(isLoggedIn, verify);

export default router;
