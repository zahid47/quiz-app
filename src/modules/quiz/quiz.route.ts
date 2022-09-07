import { Router } from "express";
import protect from "../../middlewares/protect";
import validate from "../../middlewares/validate";
import {
  createQuizController,
  deleteQuizController,
  getQuizController,
  getQuizesController,
  updateQuizController,
} from "./quiz.controller";
import {
  createQuizSchema,
  deleteQuizesSchema,
  getQuizSchema,
  getQuizesSchema,
  updateQuizesSchema,
} from "./quiz.schema";

const router = Router();

router
  .route("/:id")
  .get(validate(getQuizSchema), getQuizController)
  .patch(
    validate(updateQuizesSchema),
    protect("admin"),
    updateQuizController
  )
  .delete(
    validate(deleteQuizesSchema),
    protect("admin"),
    deleteQuizController
  );

router
  .route("/")
  .post(
    validate(createQuizSchema),
    protect("admin"),
    createQuizController
  )
  .get(validate(getQuizesSchema), getQuizesController);

export default router;
