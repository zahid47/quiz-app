import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import useUserStore from "../context/userStore";
import { updateQuiz } from "../utils/quizApi";

export default function QuizDetails({ quiz }: any) {
  const { user } = useUserStore();
  const [noOfAttempts, setNoOfAttempts] = useState(0);
  const [canView, setCanView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNoOfAttempts(
      quiz.participants.filter((participant: any) => participant === user._id)
        .length
    );

    // eslint-disable-next-line
  }, []);

  const attemptQuiz = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const updates = {
      participants: [...quiz.participants, user._id],
    };

    await updateQuiz(quiz._id, updates);
    router.push(`/quizes/${quiz._id}/attempt`);
  };

  const viewAnswers = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    router.push(`/quizes/${quiz._id}/answer`);
  };

  useEffect(() => {
    const getCanView = (): boolean => {
      if (
        quiz.answerRevealType === "After each question" ||
        quiz.answerRevealType === "After each attempt"
      ) {
        return quiz.participants.includes(user._id);
      } else {
        if (quiz.maxAttempts <= noOfAttempts) {
          return true;
        }
      }
      return false;
    };

    setCanView(getCanView());

    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <div className="relative px-4 py-8 mx-auto max-w-screen-xl">
        <div className="items-start grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div className="aspect-w-1 aspect-h-1">
              <Image
                alt={`Cover image for a quiz titled ${quiz.title}`}
                className="object-cover rounded-xl"
                src={quiz.img}
                width={640}
                height={640}
                priority
              />
            </div>
          </div>

          <div className="sticky top-0">
            <div className="flex justify-between mt-8">
              <div className="max-w-[35ch]">
                <h1 className="text-2xl font-bold">{quiz.title}</h1>
              </div>

              <p className="text-lg font-bold">
                {quiz.isPaid ? `$${quiz.price}` : "Free"}
              </p>
            </div>

            <details className="relative mt-4 group">
              <summary className="block">
                <div>
                  <div className="prose max-w-none">
                    <p>{quiz.description}</p>
                  </div>
                </div>
              </summary>
            </details>

            <form className="mt-8">
              <fieldset>
                <div className="flow-root">
                  <div className="flex flex-wrap -m-0.5">
                    <strong className="mb-4 mr-3 inline-flex items-center border border-purple-500 text-purple-500 bg-purple-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                      {quiz.isPaid ? "Paid" : "Free"}
                    </strong>
                    <strong className="mb-4 mr-3 inline-flex items-center border border-pink-500 text-pink-500 bg-pink-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                      {`${noOfAttempts}/${quiz.maxAttempts} attempt(s)`}
                    </strong>
                    <strong className="mb-4 mr-3 inline-flex items-center border border-sky-500 text-sky-500 bg-sky-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                      {quiz.questions?.length} Question(s)
                    </strong>
                    <strong className="mb-4 mr-3 inline-flex items-center border border-teal-500 text-teal-500 bg-teal-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                      {new Set(quiz.participants).size} Participant(s)
                    </strong>
                    <strong className="mb-4 mr-3 inline-flex items-center border border-amber-500 text-amber-500 bg-amber-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                      {quiz.timer?.timerType === "Per Question"
                        ? `${quiz.timer?.timerDuration} sec/ques`
                        : `${quiz.timer?.timerDuration} sec/quiz`}
                    </strong>
                  </div>
                </div>
              </fieldset>

              <div
                className={`${
                  noOfAttempts >= quiz.maxAttempts ? "" : "hidden"
                } mt-4 text-red-500`}
              >
                You have no attempts left for this quiz
              </div>
              <div className="inline-flex items-center justify-center gap-4">
                <div className="flex mt-4">
                  <button
                    disabled={noOfAttempts >= quiz.maxAttempts}
                    onClick={attemptQuiz}
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-5 py-3  bg-teal-600 text-white hover:bg-teal-700 rounded-lg sm:w-auto disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-600"
                  >
                    <span className="font-medium"> Take This Quiz </span>

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
                <div className="flex mt-4">
                  <button
                    disabled={!canView}
                    onClick={viewAnswers}
                    className="inline-flex items-center justify-center w-full px-5 py-3 border border-teal-600 text-gray-600 hover:bg-teal-600 hover:text-white rounded-lg sm:w-auto disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600"
                  >
                    <span className="font-medium"> View Answers </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
