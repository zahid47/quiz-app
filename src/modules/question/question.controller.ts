import { Request, Response, NextFunction } from "express";
import createError from "../../utils/createError";
import {
  createQuestionInput,
  deleteQuestionsInput,
  getQuestionInput,
  getQuestionsInput,
  updateQuestionsInput,
} from "./question.schema";
import {
  createQuestion,
  findAndDeleteQuestion,
  findAndUpdateQuestion,
  findQuestionById,
  findQuestions,
} from "./question.service";
import log from "../../utils/logger";

export const createQuestionController = async (
  req: Request<{}, createQuestionInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const question = await createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

export const getQuestionsController = async (
  req: Request<{}, {}, {}, getQuestionsInput["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.page ? parseInt(req.query.page) : 0;

    const ques = await findQuestions(limit, skip);
    return res.status(200).json(ques);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "question", err.message));
  }
};

export const getQuestionController = async (
  req: Request<getQuestionInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const question = await findQuestionById(id);

    if (!question)
      return next(
        createError(
          404,
          "question",
          JSON.stringify({ details: "question not found" })
        )
      );
    return res.status(200).json(question);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "question", err.message));
  }
};

export const updateQuestionController = async (
  req: Request<
    updateQuestionsInput["params"],
    {},
    updateQuestionsInput["body"]
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const question = await findAndUpdateQuestion(id, update);

    if (!question)
      return next(
        createError(
          404,
          "question",
          JSON.stringify({ details: "question not found" })
        )
      );

    return res.status(200).json(question);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "question", err.message));
  }
};

export const deleteQuestionController = async (
  req: Request<deleteQuestionsInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const question = await findAndDeleteQuestion(id);

    if (!question)
      return next(
        createError(
          404,
          "question",
          JSON.stringify({ details: "question not found" })
        )
      );

    return res.status(200).json({ success: true, message: "Question deleted" });
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "question", err.message));
  }
};
