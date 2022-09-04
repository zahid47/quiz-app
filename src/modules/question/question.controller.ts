import { Request, Response, NextFunction } from "express";
import { createQuestionInput } from "./question.schema";
import { createQuestion } from "./question.service";

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
