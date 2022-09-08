import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import Artwork from "../../Assets/Artwork";
import { MouseEvent } from "react";

export default function AddQuiz() {
  const [quiz, setQuiz] = useState<any>({
    isPaid: false,
    answerRevealType: "After each question",
  });

  const [options, setOptions] = useState<any[]>([
    { title: null, isCorrect: false },
  ]);

  const [questions, setQuestions] = useState<any[]>([
    {
      title: null,
      score: null,
      options: null,
    },
    {
      title: null,
      score: null,
      options: null,
    },
  ]);

  const handleImage = async () => {
    const data = new FormData();
    data.append("file", quiz.img);
    data.append("upload_preset", "dynamic-quiz");
    data.append("cloud_name", "pizza47");

    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT!;

    try {
      const response = await axios.post(endpoint, data);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddOption = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setOptions([...options, { title: null, isCorrect: false }]);
  };

  const removeOption = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    if (options.length < 2) return; //can't remove the last option!

    options.splice(index, 1);
    setOptions([...options]);
  };

  const handleAddQuestion = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    // setQuestions([...questions, { ...quiz, options }]);
    // setQuiz({ ...quiz, options: [] });
    // setOptions([{ title: null, isCorrect: false }]);
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
                type="submit"
                className="inline-flex items-center justify-center w-full px-5 py-3  bg-teal-600 text-white hover:bg-teal-700 rounded-lg sm:w-auto"
              >
                <span className="font-medium"> Done </span>

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

              <div>
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
                  <option value="After each attempt">After each attempt</option>
                  <option value="After all attempts">After all attempts</option>
                </select>
              </div>

              <div>
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
                    setQuiz({ ...quiz, maxAttempts: parseInt(e.target.value) })
                  }
                />
              </div>

              <div>
                <label className="text-gray-600" htmlFor="img">
                  Cover Image
                </label>
                <input
                  onChange={(e) => {
                    const imgs = e.target.files;
                    const img = imgs && imgs[0];
                    setQuiz({ ...quiz, img });
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

              {questions.map((_question: any, index: number) => (
                <div key={index}>
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

                  {/* <h2 className="text-1.5xl font-bold mr-4">Question</h2> */}

                  <div>
                    <label className="sr-only" htmlFor="question">
                      Question
                    </label>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Question Title"
                      type="text"
                      id="question"
                    />
                  </div>

                  {/* OPTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                  {/* <h2 className="text-1.5xl font-bold mr-4">Options</h2> */}

                  {options.map((_option: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center">
                        <button
                          onClick={(e) => {
                            removeOption(e, index);
                          }}
                          className="mr-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${
                              options.length > 1
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
                          placeholder="Option Text"
                          type="text"
                          id="option"
                          onChange={(e) => {
                            setOptions((prevOptions: any) => {
                              prevOptions[index].title = e.target.value;
                              return prevOptions;
                            });
                          }}
                        />

                        <div className="flex items-center ml-6">
                          <input
                            onChange={(e) => {
                              setOptions((prevOptions: any) => {
                                prevOptions[index].isCorrect = e.target.checked;
                                return prevOptions;
                              });
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
                  <button
                    onClick={(e) => {
                      handleAddOption(e);
                    }}
                    className="block bg-amber-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-amber-600 hover:text-white"
                  >
                    {options.length > 0
                      ? "Add another option"
                      : "Add an option"}
                  </button>
                </div>
              ))}

              <button
                onClick={(e) => {
                  handleAddQuestion(e);
                }}
                className="bg-sky-100 text-sky-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-sky-600 hover:text-white"
              >
                Add another question
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
