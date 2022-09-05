import { Router } from "express";
import protect from "../../middlewares/protect";
import validate from "../../middlewares/validate";
import {
  createQuestionController,
  deleteQuestionController,
  getQuestionController,
  getQuestionsController,
  updateQuestionController,
} from "./question.controller";
import {
  createQuestionSchema,
  deleteQuestionsSchema,
  getQuestionSchema,
  getQuestionsSchema,
  updateQuestionsSchema,
} from "./question.schema";

const router = Router();

router
  .route("/:id")
  .get(validate(getQuestionSchema), getQuestionController)
  .put(
    validate(updateQuestionsSchema),
    protect("admin"),
    updateQuestionController
  )
  .delete(
    validate(deleteQuestionsSchema),
    protect("admin"),
    deleteQuestionController
  );

router
  .route("/")
  .post(
    validate(createQuestionSchema),
    protect("admin"),
    createQuestionController
  )
  .get(validate(getQuestionsSchema), getQuestionsController);

export default router;
