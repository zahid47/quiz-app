import Option from "./Option";

export default function Attempt() {
  return (
    <section className="bg-gray-100">
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-3">
          {/* ques and timer */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold inline">
                How often do you quack?
              </h1>

              <strong className="inline-flex items-center border border-gray-200 rounded relative px-2.5 py-1.5 text-md font-medium">
                <span className="text-gray-700"> Time Left: </span>

                <span className="font-bold text-green-700 ml-1.5">32</span>
              </strong>
            </div>
            <h1 className="text-gray-500 text-md font-normal inline">
              2 of 5 Questions
            </h1>
          </div>

          {/* options */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <Option />
            <Option />
            <Option />
          </div>

          {/* bottom */}

          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-5 py-3  bg-teal-600 text-white hover:bg-teal-700 rounded-lg sm:w-auto"
          >
            <span className="font-medium"> Next Question</span>
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
