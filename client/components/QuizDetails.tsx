import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getQuiz } from "../utils/quizApi";

export default function QuizDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [quiz, setQuiz] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await getQuiz(id);
      setQuiz(res.data);
    };
    if (id) fetchQuiz();
    setLoading(false);
  }, [id]);

  return (
    <div>
      {loading ? (
        <>Loading</>
      ) : (
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

                  <p className="text-lg font-bold">${quiz.price}</p>
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
                        <strong className="mr-3 inline-flex items-center border border-purple-500 text-purple-500 bg-purple-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                          {quiz.isPaid ? "Paid" : "Free"}
                        </strong>
                        <strong className="mr-3 inline-flex items-center border border-sky-500 text-sky-500 bg-sky-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                          {quiz.questions?.length} Questions
                        </strong>
                        <strong className="mr-3 inline-flex items-center border border-teal-500 text-teal-500 bg-teal-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                          {quiz.participants?.length} Participants
                        </strong>
                        <strong className="mr-3 inline-flex items-center border border-amber-500 text-amber-500 bg-amber-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                          {quiz.timer?.timerType === "perQuestion"
                            ? `${quiz.timer?.timerDuration} sec/ques`
                            : `${quiz.timer?.timerDuration} sec/quiz`}
                        </strong>
                      </div>
                    </div>
                  </fieldset>

                  <div className="flex mt-8">
                    <a
                      href={`/quizes/${id}/attempt`}
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-5 py-3  bg-teal-600 text-white hover:bg-teal-700 rounded-lg sm:w-auto"
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
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
