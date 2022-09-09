import Option from "./Option";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import Results from "./Assets/Results";

export default function Attempt({ quiz }: any) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<any>({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(quiz.timer.timerDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev: number) => prev - 1);
      } else {
        if (quiz.timer.timerType === "Per Question") {
          handleNextQuestion();
          setTimer(quiz.timer.timerDuration);
        } else {
          setFinished(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const handleNextQuestion = (e?: MouseEvent) => {
    if (e) e.preventDefault();
    const totalQuestions = quiz.questions.length;

    const isCorrect = quiz.questions[idx].options.every(
      (option: any) =>
        (option.isCorrect && answer[option._id]) ||
        (!option.isCorrect && !answer[option._id])
    );

    if (isCorrect) {
      setScore(score + quiz.questions[idx].score);
    }
    if (idx < totalQuestions - 1) {
      setIdx(idx + 1);
    } else {
      setFinished(true);
    }
  };

  return finished ? (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div>
        <Results />
      </div>
      <h1 className="text-4xl font-bold text-center">Your Score is {score}</h1>
      <button
        className="mb=4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => router.push("/")}
      >
        Go Home
      </button>
    </div>
  ) : (
    <section className="bg-gray-100">
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-3">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold inline">
                {quiz.questions[idx].title}
              </h1>
              {/* <h2>{score}</h2> */}

              <strong className="inline-flex items-center border border-gray-200 rounded relative px-2.5 py-1.5 text-md font-medium">
                <span className="text-gray-700"> Time Left: </span>

                <span className="font-bold text-green-700 ml-1.5">{timer}</span>
              </strong>
            </div>
            <h1 className="text-gray-500 text-md font-normal inline">
              {`${idx + 1} of ${quiz.questions?.length} Questions`}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {quiz.questions[idx].options?.map((option: any) => (
              <Option
                key={option._id}
                option={option}
                answer={answer}
                setAnswer={setAnswer}
                idx={idx}
              />
            ))}
          </div>

          <button
            onClick={(e) => {
              handleNextQuestion(e);
            }}
            type="submit"
            className="inline-flex items-center justify-center w-full px-5 py-3  bg-teal-600 text-white hover:bg-teal-700 rounded-lg sm:w-auto"
          >
            <span className="font-medium">
              {idx + 1 >= quiz.questions.length
                ? "Finish Quiz"
                : "Next Question"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
