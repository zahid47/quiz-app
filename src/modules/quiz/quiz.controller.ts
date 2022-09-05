import { Request, Response, NextFunction } from "express";
import createError from "../../utils/createError";
import {
  createQuizInput,
  deleteQuizesInput,
  getQuizInput,
  getQuizesInput,
  updateQuizesInput,
} from "./quiz.schema";
import {
  createQuiz,
  findAndDeleteQuiz,
  findAndUpdateQuiz,
  findQuizById,
  findQuizes,
} from "./quiz.service";
import log from "../../utils/logger";

export const createQuizController = async (
  req: Request<{}, createQuizInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

export const getQuizesController = async (
  req: Request<{}, {}, {}, getQuizesInput["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.page ? parseInt(req.query.page) : 0;

    const ques = await findQuizes(limit, skip);
    return res.status(200).json(ques);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "quiz", err.message));
  }
};

export const getQuizController = async (
  req: Request<getQuizInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const quiz = await findQuizById(id);

    if (!quiz)
      return next(
        createError(404, "quiz", JSON.stringify({ details: "quiz not found" }))
      );
    return res.status(200).json(quiz);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "quiz", err.message));
  }
};

export const updateQuizController = async (
  req: Request<updateQuizesInput["params"], {}, updateQuizesInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const update = req.body;

    if ("isPaid" in update) {
      update.price = update.isPaid ? update.price : 0;
    }

    const quiz = await findAndUpdateQuiz(id, update);

    if (!quiz)
      return next(
        createError(404, "quiz", JSON.stringify({ details: "quiz not found" }))
      );

    return res.status(200).json(quiz);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "quiz", err.message));
  }
};

export const deleteQuizController = async (
  req: Request<deleteQuizesInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const quiz = await findAndDeleteQuiz(id);

    if (!quiz)
      return next(
        createError(404, "quiz", JSON.stringify({ details: "quiz not found" }))
      );

    return res.status(200).json({ success: true, message: "Quiz deleted" });
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "quiz", err.message));
  }
};
