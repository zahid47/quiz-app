import mongoose from "mongoose";
import { questionDocument } from "./question.type";

const questionSchema = new mongoose.Schema(
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

const Question = mongoose.model<questionDocument>("Question", questionSchema);
export default Question;
