import mongoose from "mongoose";

export interface quizInputType {
  title: string;
  description: string;
  paid: boolean;
  img: string;
  maxAttempts: number;
  timer: {
    timerType: "none" | "perQuestion" | "perQuiz";
    timerDuration: number;
  };
}

export interface quizDocument extends quizInputType, mongoose.Document {
  participants: mongoose.Types.ObjectId[];
  questions: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
