import { array, boolean, number, object, string, TypeOf } from "zod";

export const createQuizSchema = object({
  body: object({
    title: string({ required_error: "title is required" }),
    description: string({ required_error: "description is required" }),
    isPaid: boolean().optional(),
    price: number().optional(),
    img: string({ required_error: "img is required" }),
    maxAttempts: number({ required_error: "maxAttempts is required" }),
    timer: object({
      timerType: string({ required_error: "timerType is required" }),
      timerDuration: number({ required_error: "timerDuration is required" }),
    }),
    questions: array(
      string({ required_error: "at least one question is required" }).min(
        1,
        "at least one question is required"
      )
    ),
  }).strict(),
});

export const getQuizesSchema = object({
  query: object({
    limit: string().optional(),
    page: string().optional(),
  }),
});

export const getQuizSchema = object({
  params: object({
    id: string(),
  }),
});

export const updateQuizesSchema = object({
  params: object({
    id: string({ required_error: "id is required" }),
  }),
  body: object({
    title: string().optional(),
    description: string().optional(),
    isPaid: boolean().optional(),
    price: number().optional(),
    img: string().optional(),
    maxAttempts: number().optional(),
    timer: object({
      timerType: string().optional(),
      timerDuration: number().optional(),
    }).optional(),
    questions: array(string().min(1)).optional(),
    participants: array(
      object({
        user: string(),
        attempts: number(),
        score: number(),
      })
    ).optional(),
  }).strict(),
});

export const deleteQuizesSchema = object({
  params: object({
    id: string({ required_error: "id is required" }),
  }),
});

export type createQuizInput = TypeOf<typeof createQuizSchema>;
export type getQuizesInput = TypeOf<typeof getQuizesSchema>;
export type getQuizInput = TypeOf<typeof getQuizSchema>;
export type updateQuizesInput = TypeOf<typeof updateQuizesSchema>;
export type deleteQuizesInput = TypeOf<typeof deleteQuizesSchema>;
