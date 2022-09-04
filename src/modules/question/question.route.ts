import { Router } from "express";
import protect from "../../middlewares/protect";
import validate from "../../middlewares/validate";
import { createQuestionController } from "./question.controller";
import { createQuestionSchema } from "./question.schema";

const router = Router();

router
  .route("/")
  .post(
    validate(createQuestionSchema),
    protect("admin"),
    createQuestionController
  );

export default router;
