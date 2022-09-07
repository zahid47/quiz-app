import { useState } from "react";
import Artwork from "./Artwork";

export default function AddQuiz() {
  const [quiz, setQuiz] = useState<any>({
    isPaid: false,
  });

  return (
    <section className="bg-gray-100">
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
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
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Description"
                  rows={2}
                  id="description"
                ></textarea>
              </div>

              <div>
                <label className="sr-only" htmlFor="img">
                  Image
                </label>
                <input
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
                  type="text"
                  id="price"
                  hidden={!quiz.isPaid}
                />
              </div>

              {/* QUESTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              <h2 className="text-1.5xl font-bold mr-4">Questions</h2>

              <div>
                <label className="sr-only" htmlFor="question">
                  Question
                </label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Question 1"
                  type="text"
                  id="question"
                />
              </div>

              <div>
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="option">
                    Option
                  </label>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Option 1"
                    type="text"
                    id="option"
                  />

                  <div className="flex items-center ml-6">
                    <input
                      id="isCorrect"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
                    />
                    <label htmlFor="isCorrect" className="ml-2 text-sm">
                      Correct?
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="option">
                    Option
                  </label>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Option 2"
                    type="text"
                    id="option"
                  />

                  <div className="flex items-center ml-6">
                    <input
                      id="isCorrect"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
                    />
                    <label htmlFor="isCorrect" className="ml-2 text-sm">
                      Correct?
                    </label>
                  </div>
                </div>
              </div>

              <button className="block bg-amber-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-amber-600 hover:text-white">
                Add an option
              </button>

              <button className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-teal-600 hover:text-white">
                Add a question
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
