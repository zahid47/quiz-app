import Quiz from "./quiz.model";
import { quizInputType } from "./quiz.type";
import { UpdateQuery } from "mongoose";

export const createQuiz = async (input: quizInputType) => {
  return await Quiz.create(input);
};

export const findQuizById = async (id: string) => {
  return await Quiz.findById(id).populate("questions");
};

export const findQuizes = async (limit: number, skip: number) => {
  return await Quiz.find().populate("questions").limit(limit).skip(skip);
};

export const findAndUpdateQuiz = async (
  id: string,
  update: UpdateQuery<Partial<quizInputType>>
) => {
  return await Quiz.findByIdAndUpdate(id, update, { new: true }).populate(
    "questions"
  );
};

export const findAndDeleteQuiz = async (id: string) => {
  return await Quiz.findByIdAndDelete(id);
};
