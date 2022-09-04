import Question from "./question.model";
import { questionInputType } from "./question.type";

export const createQuestion = async (input: questionInputType) => {
  return await Question.create(input);
};
