import mongoose from "mongoose";
import { quizDocument } from "./quiz.type";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    price: { type: Number, required: true, default: 0 },
    img: { type: String, required: true },
    maxAttempts: { type: Number, required: true, default: 1, min: 1 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question", min: 1 },
    ],
    timer: {
      timerType: {
        type: String,
        required: true,
        enum: ["Per Question", "Per Quiz"],
        default: "Per Question",
      },
      timerDuration: { type: Number, required: true, default: 60 }, // in seconds
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answerRevealType: {
      type: String,
      required: true,
      enum: ["After each question", "After each attempt", "After all attempts"],
      default: "After all attempts",
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model<quizDocument>("Quiz", quizSchema);
export default Quiz;
