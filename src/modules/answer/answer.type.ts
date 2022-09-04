import mongoose from "mongoose";

export interface answerInputType {
  title: string;
  score: number;
  options: {
    title: string;
    isCorrect: boolean;
  }[];
}

export interface answerDocument extends answerInputType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
