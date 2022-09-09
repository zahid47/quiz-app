import router from "next/router";
import { MouseEvent, useState } from "react";
import useQuizStore from "../../../context/quizStore";
import { addQuiz } from "../../../utils/quizApi";

export default function Confirm() {
  const [loading, setLoading] = useState(false);
  const { quiz, clearQuiz } = useQuizStore();

  const handleAddQuiz = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    setLoading(true);
    await addQuiz(quiz);
    clearQuiz();
    setLoading(false);

    router.push("/admin");
  };
  return (
    quiz.title && (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl font-bold mb-4">
          You are about to create a new quiz
        </h1>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-bold mb-4">Quiz Title</h1>
            <p className="text-lg">{quiz.title}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-bold mb-4">Quiz Description</h1>
            <p className="text-lg">{quiz.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full mb-4">
            <p className="text-lg">with {quiz.questions.length} question(s)</p>
          </div>
        </div>
        <button
          className="px-4 py-2 text-white bg-teal-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700"
          onClick={handleAddQuiz}
          disabled={loading || !quiz.title}
        >
          {loading ? "Loading..." : "Confirm"}
        </button>
      </div>
    )
  );
}
