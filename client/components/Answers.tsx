export default function Answers({ quiz }: any) {
  return (
    <div>
      <h1 className="flex flex-col items-center justify-center w-full h-full font-bold text-2xl m-4">
        {quiz.title}
      </h1>

      <ul>
        {quiz.questions?.map((question: any) => (
          <li
            key={question._id}
            className="p-4 col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="text-lg font-medium mb-4">{question.title}</div>
            <ul>
              {question.options?.map((option: any) => (
                <li 
                className={`${option.isCorrect ? "bg-teal-500" : "bg-red-500"} text-white p-4 rounded-lg mb-2`}
                key={option._id}>{option.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
