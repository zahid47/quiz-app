import Question from "./question.model";
import { questionInputType } from "./question.type";
import { UpdateQuery } from "mongoose";

export const createQuestion = async (input: questionInputType) => {
  return await Question.create(input);
};

export const findQuestionById = async (id: string) => {
  return await Question.findById(id);
};

export const findQuestions = async (limit: number, skip: number) => {
  return await Question.find().limit(limit).skip(skip);
};

export const findAndUpdateQuestion = async (
  id: string,
  update: UpdateQuery<Partial<questionInputType>>
) => {
  return await Question.findByIdAndUpdate(id, update, { new: true });
};

export const findAndDeleteQuestion = async (id: string) => {
  return await Question.findByIdAndDelete(id);
};
