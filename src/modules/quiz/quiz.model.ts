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
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        attempts: { type: Number, default: 0 },
        score: { type: Number, default: 0 },
      },
    ],
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question", min: 1 },
    ],
    timer: {
      timerType: { type: String, required: true, default: "none" }, // none, perQuestion, perQuiz
      timerDuration: { type: Number, required: true, default: 60 }, // in seconds
    },
  },
  { timestamps: true }
);

// quizSchema.pre("update", async function (next) {
//   const quiz = this as quizDocument;
//   if (!quiz.isModified("isPaid")) return next();

//   quiz.price = quiz.isPaid ? quiz.price : 0;
//   return next();
// });

const Quiz = mongoose.model<quizDocument>("Quiz", quizSchema);
export default Quiz;
