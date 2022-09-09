import Image from "next/image";

export default function Quiz({ quiz }: any) {
  const colors1 = [
    "from-teal-300",
    "from-sky-300",
    "from-rose-300",
    "from-amber-300",
  ];
  const colors2 = [
    "via-teal-500",
    "via-sky-500",
    "via-rose-500",
    "via-amber-500",
  ];
  const colors3 = ["to-teal-600", "to-sky-600", "to-rose-600", "to-amber-600"];

  return (
    <div className="2xl:w-1/5 xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1 flex-grow-0">
      <a
        className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg bg-white"
        href={`/quizes/${quiz._id}`}
      >
        <span
          className={`absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r ${
            colors1[Math.floor(Math.random() * colors1.length)]
          } ${colors2[Math.floor(Math.random() * colors2.length)]} ${
            colors3[Math.floor(Math.random() * colors3.length)]
          }`}
        ></span>

        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-gray-900">{quiz.title}</h5>
            <p className="mt-1 text-xs font-medium text-gray-600">
              By {quiz.createdBy.name}
            </p>
          </div>

          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <Image
              className="object-cover w-16 h-16 rounded-lg shadow-sm"
              src={quiz.img}
              alt={`Cover image for a quiz titled ${quiz.title}`}
              width={64}
              height={64}
            />
          </div>
        </div>

        <div className="mt-4 sm:pr-8">
          <p className="text-sm text-gray-500">{quiz.description}</p>
        </div>

        <dl className="flex mt-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Question(s)</dt>
            <dd className="text-xs text-gray-500">{quiz.questions.length}</dd>
          </div>

          <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-gray-600">
              Participant(s)
            </dt>
            <dd className="text-xs text-gray-500">
              {new Set(quiz.participants).size}
            </dd>
          </div>

          <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-gray-600">Timer</dt>
            <dd className="text-xs text-gray-500">
              {quiz.timer.timerType === "Per Question"
                ? `${quiz.timer.timerDuration} sec/ques`
                : `${quiz.timer.timerDuration} sec/quiz`}
            </dd>
          </div>

          <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-gray-600">Price</dt>
            <dd className="text-xs text-gray-500">
              {quiz.isPaid ? `$${quiz.price}` : "Free"}
            </dd>
          </div>
        </dl>
      </a>
    </div>
  );
}
