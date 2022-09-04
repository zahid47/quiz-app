import mongoose from "mongoose";
import { quizDocument } from "./quiz.type";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    paid: { type: Boolean, required: true, default: false },
    img: { type: String, required: true },
    maxAttempts: { type: Number, required: true, default: 1 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    timer: {
        timerType: { type: String, required: true, default: "none" }, // none, perQuestion, perQuiz
        timerDuration: { type: Number, required: true, default: 60 }, // in seconds
    },
    // totalScore: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Quiz = mongoose.model<quizDocument>("Quiz", quizSchema);
export default Quiz;
