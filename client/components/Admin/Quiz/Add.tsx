import axios from "../../../utils/axios";
import { useState, MouseEvent } from "react";
import Artwork from "../../Assets/Artwork";
import { addQuestion } from "../../../utils/quesApi";
import { useRouter } from "next/router";
import useUserStore from "../../../context/userStore";
import useQuizStore from "../../../context/quizStore";

export default function Add() {
  const router = useRouter();
  const { user } = useUserStore();

  const { quiz, setQuiz } = useQuizStore();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const [questions, setQuestions] = useState<any[]>([
    {
      title: "",
      score: "",
      options: [{ title: "", isCorrect: false }],
    },
  ]);

  const uploadImage = async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dynamic-quiz");
    data.append("cloud_name", "pizza47");

    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT!;
    const response = await axios.post(endpoint, data);
    return response.data.url;
  };

  const handleAddOption = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    quesIdx: number
  ) => {
    e.preventDefault();
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[quesIdx].options = [
        ...newQuestions[quesIdx].options,
        { title: "", isCorrect: false },
      ];
      return newQuestions;
    });
  };

  const removeOption = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    quesIdx: number,
    optIdx: number
  ) => {
    e.preventDefault();
    if (questions[quesIdx].options.length < 2) return; //can't remove the last option!

    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[quesIdx].options = newQuestions[quesIdx].options.filter(
        (_option: any, idx: any) => idx !== optIdx
      );
      return newQuestions;
    });
  };

  const handleAddQuestion = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      {
        title: "",
        score: "",
        options: [{ title: "", isCorrect: false }],
      },
    ]);
  };

  const removeQuestion = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    if (questions.length < 2) return; //can't remove the last question!

    questions.splice(index, 1);
    setQuestions([...questions]);
  };

  const prepareQuiz = async () => {
    try {
      setLoading(true);
      const img = await uploadImage(image);

      let quesIds = [];

      for (const question of questions) {
        const { data } = await addQuestion(question);
        quesIds.push(data._id);
      }

      setQuiz({ ...quiz, img, questions: quesIds, createdBy: user._id });
      router.push("/admin/quizes/add/confirm");
    } catch {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5 ">
          <div className="lg:py-12 lg:col-span-2">
            <Artwork />
          </div>

          <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold inline mr-4">Quiz Details</h1>

              <button
                disabled={loading}
                onClick={prepareQuiz}
                type="submit"
                className="font-medium inline-flex items-center justify-center w-full px-5 py-3  hover:bg-teal-600 hover:text-white  bg-teal-100 text-teal-700 rounded-lg sm:w-auto"
              >
                {loading ? "Loading..." : "Add Quiz"}
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
            <h1 className="text-red-500 mb-4">{error}</h1>
            <form action="" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="title">
                  Title
                </label>
                <input
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Title"
                  type="text"
                  id="title"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="description">
                  Description
                </label>
                <textarea
                  onChange={(e) =>
                    setQuiz({ ...quiz, description: e.target.value })
                  }
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Description"
                  rows={2}
                  id="description"
                ></textarea>
              </div>

              <div className="flex items-center mb-4 gap-4 flex-wrap">
                <div className="flex-grow flex-1">
                  <label className="text-gray-600" htmlFor="revealAnswer">
                    Reveal Answer
                  </label>
                  <select
                    className="w-full p-3 text-sm border-gray-200 rounded-lg mt-2"
                    id="revealAnswer"
                    onChange={(e) => {
                      setQuiz({ ...quiz, answerRevealType: e.target.value });
                    }}
                    defaultValue={quiz.answerRevealType}
                  >
                    <option value="After each question">
                      After each question
                    </option>
                    <option value="After each attempt">
                      After each attempt
                    </option>
                    <option value="After all attempts">
                      After all attempts
                    </option>
                  </select>
                </div>
                <div className="flex-grow flex-1">
                  <label className="text-gray-600" htmlFor="maxAttempts">
                    Max Attempts
                  </label>
                  <input
                    min={1}
                    type="number"
                    className="w-full p-3 text-sm border-gray-200 rounded-lg mt-2"
                    placeholder="Max number of attempts"
                    id="maxAttempts"
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        maxAttempts: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center mb-4 gap-4 flex-wrap">
                <div className="flex-grow flex-1">
                  <label className="text-gray-600" htmlFor="timerType">
                    Timer Type
                  </label>
                  <select
                    className="w-full p-3 text-sm border-gray-200 rounded-lg mt-2"
                    id="timerType"
                    onChange={(e) => {
                      setQuiz({
                        ...quiz,

                        timer: {
                          ...quiz.timer,
                          timerType: e.target.value,
                        },
                      });
                    }}
                    defaultValue={quiz.timer.timerType}
                  >
                    <option value="Per Question">Per Question</option>
                    <option value="Per Quiz">Per Quiz</option>
                  </select>
                </div>
                <div className="flex-grow flex-1">
                  <label className="text-gray-600" htmlFor="timerDuration">
                    Timer Duration
                  </label>
                  <input
                    min={1}
                    type="number"
                    className="w-full p-3 text-sm border-gray-200 rounded-lg mt-2"
                    placeholder="Timer duration in seconds"
                    id="timerDuration"
                    onChange={(e) => {
                      setQuiz({
                        ...quiz,

                        timer: {
                          ...quiz.timer,
                          timerDuration: parseInt(e.target.value),
                        },
                      });
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600" htmlFor="img">
                  Cover Image
                </label>
                <input
                  onChange={(e) => {
                    const imgs = e.target.files;
                    const img = imgs && imgs[0];
                    setImage(img);
                  }}
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Image"
                  type="file"
                  id="img"
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  onChange={(e) => {
                    setQuiz({
                      ...quiz,
                      isPaid: e.target.checked,
                    });
                  }}
                  checked={quiz.isPaid}
                  id="isPaid"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
                />
                <label htmlFor="isPaid" className="ml-2 text-sm">
                  Paid?
                </label>
              </div>

              <div>
                <label className="sr-only" htmlFor="price">
                  Price
                </label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Price in USD"
                  type="number"
                  min={1}
                  id="price"
                  hidden={!quiz.isPaid}
                  onChange={(e) => {
                    setQuiz({ ...quiz, price: parseInt(e.target.value) });
                  }}
                />
              </div>

              {/* QUESTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {questions.map((question: any, quesIdx: number) => (
                <div key={quesIdx}>
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-b border-black-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-sm text-black-500">
                        Question
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <button
                      onClick={(e) => {
                        removeQuestion(e, quesIdx);
                      }}
                      className="mr-4"
                    >
                      <div className="remove-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${
                            questions.length > 1
                              ? "fill-red-600"
                              : "fill-gray-600 cursor-not-allowed"
                          }  h-5 w-5`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </button>
                    <label className="sr-only" htmlFor="question">
                      Question
                    </label>
                    <input
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[quesIdx].title = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      value={question.title}
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Question Title"
                      type="text"
                      id="question"
                    />
                    <label className="sr-only" htmlFor="score">
                      Score
                    </label>
                    <input
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[quesIdx].score = parseInt(e.target.value);
                        setQuestions(newQuestions);
                      }}
                      value={question.score}
                      className="w-full p-3 text-sm border-gray-200 rounded-lg ml-4"
                      placeholder="Score for this question"
                      type="number"
                      id="score"
                    />
                  </div>

                  {/* OPTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                  {question.options.map((option: any, optionIdx: number) => (
                    <div className="mb-2" key={optionIdx}>
                      <div className="flex items-center">
                        <button
                          onClick={(e) => {
                            removeOption(e, quesIdx, optionIdx);
                          }}
                          className="mr-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${
                              question.options.length > 1
                                ? "fill-red-600"
                                : "fill-gray-600 cursor-not-allowed"
                            }  h-5 w-5`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        <label className="sr-only" htmlFor="option">
                          Option
                        </label>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Option Text (you need to add at least 2 options)"
                          type="text"
                          id="option"
                          value={option.title}
                          onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[quesIdx].options[optionIdx].title =
                              e.target.value;
                            setQuestions(newQuestions);
                          }}
                        />

                        <div className="flex items-center ml-6">
                          <input
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[quesIdx].options[
                                optionIdx
                              ].isCorrect = e.target.checked;
                              setQuestions(newQuestions);
                            }}
                            id="isCorrect"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
                          />
                          <label htmlFor="isCorrect" className="ml-2 text-sm">
                            Correct?
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        handleAddOption(e, quesIdx);
                      }}
                      className="block bg-amber-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-amber-600 hover:text-white"
                    >
                      {question.options.length > 0
                        ? "Add another option"
                        : "Add an option"}
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => {
                    handleAddQuestion(e);
                  }}
                  className="bg-sky-100 text-sky-700 px-3 py-1.5 rounded text-md font-medium hover:bg-sky-600 hover:text-white"
                >
                  Add another question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
