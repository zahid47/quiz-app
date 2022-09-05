import { array, boolean, number, object, string, TypeOf } from "zod";

export const createQuestionSchema = object({
  body: object({
    title: string({ required_error: "title is required" }),
    score: number({ required_error: "score is required" }),
    options: array(
      object({
        title: string({ required_error: "title is required" }),
        isCorrect: boolean().optional(),
      })
    ).min(2, { message: "you have to provide atleast 2 options" }),
  }).strict(),
});

export const getQuestionsSchema = object({
  query: object({
    limit: string().optional(),
    page: string().optional(),
  }),
});

export const getQuestionSchema = object({
  params: object({
    id: string(),
  }),
});

export const updateQuestionsSchema = object({
  params: object({
    id: string({ required_error: "id is required" }),
  }),
  body: object({
    title: string().optional(),
    score: number().optional(),
    options: array(
      object({
        title: string().optional(),
        isCorrect: boolean().optional(),
      })
    )
      .length(2, { message: "you have to provide atleast 2 options" })
      .optional(),
  }).strict(),
});

export const deleteQuestionsSchema = object({
  params: object({
    id: string({ required_error: "id is required" }),
  }),
});

export type createQuestionInput = TypeOf<typeof createQuestionSchema>;
export type getQuestionsInput = TypeOf<typeof getQuestionsSchema>;
export type getQuestionInput = TypeOf<typeof getQuestionSchema>;
export type updateQuestionsInput = TypeOf<typeof updateQuestionsSchema>;
export type deleteQuestionsInput = TypeOf<typeof deleteQuestionsSchema>;
