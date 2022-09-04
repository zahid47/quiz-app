import { array, number, object, string, TypeOf } from "zod";

export const createQuestionSchema = object({
  body: object({
    title: string({ required_error: "title is required" }),
    score: number({ required_error: "score is required" }),
    options: array(
      object({
        title: string({ required_error: "title is required" }),
      })
    ).length(2, { message: "you have to provide atleast 2 options" }),
  }).strict(),
});

export type createQuestionInput = TypeOf<typeof createQuestionSchema>;
