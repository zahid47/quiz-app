import mongoose from "mongoose";
import { answerDocument } from "./answer.type";

const answerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    score: { type: Number, required: true },
    options: [
      {
        title: { type: String, required: true },
        isCorrect: { type: Boolean, required: true, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Answer = mongoose.model<answerDocument>("Answer", answerSchema);
export default Answer;
