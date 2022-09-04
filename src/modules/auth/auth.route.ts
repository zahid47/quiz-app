import { Router } from "express";
import {
  loginController,
  getMeController,
  refreshAccessTokenController,
} from "./auth.controller";
import protect from "../../middlewares/protect";
import validate from "../../middlewares/validate";
import { loginSchema, refreshAccessTokenSchema } from "./auth.schema";

const router = Router();

router.route("/login").post(validate(loginSchema), loginController);
router.route("/me").get(protect("user"), getMeController);
router
  .route("/refresh")
  .get(validate(refreshAccessTokenSchema), refreshAccessTokenController);
// router
//   .route("/reset-pass/:code")
//   .post(validate(resetPassSchema), resetPassController);
// router
//   .route("/reset-pass")
//   .post(validate(sendResetPassEmailSchema), sendResetPassEmailController);

export default router;
