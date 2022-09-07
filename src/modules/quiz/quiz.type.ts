import mongoose from "mongoose";

export interface quizInputType {
  title: string;
  description: string;
  isPaid: boolean;
  price?: number;
  img: string;
  maxAttempts: number;
  timer: {
    timerType: "perQuestion" | "perQuiz";
    timerDuration: number;
  };
}

export interface quizDocument extends quizInputType, mongoose.Document {
  participants: {
    user: mongoose.Schema.Types.ObjectId;
    attempts: number;
    score: number;
  }[];
  questions: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  answerRevealType: "After each question" | "After each attempt" | "After all attempts";
  createdAt: Date;
  updatedAt: Date;
}
