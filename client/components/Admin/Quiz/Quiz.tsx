import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Quiz({ quiz }: any) {
  return (
    <tbody className="divide-y divide-gray-100">
      <tr>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          {quiz._id}
        </td>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          {quiz.title}
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          {quiz.questions.length}
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          {quiz.participants.length}
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          {quiz.isPaid ? `$${quiz.price}` : "Free"}
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          {quiz.timer.timerType === "perQuestion"
            ? `${quiz.timer.timerDuration} sec/question`
            : `${quiz.timer.timerDuration} sec/quiz`}
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          {quiz.answerRevealType}
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          {dayjs(quiz.updatedAt).fromNow()}
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
          <button className=" hover:bg-sky-600 hover:text-white bg-sky-100 text-sky-600 px-3 py-1.5 rounded text-xs font-medium">
            <AiFillEdit />
          </button>
          <button className="ml-2 hover:bg-rose-600 hover:text-white bg-rose-100 text-rose-600 px-3 py-1.5 rounded text-xs font-medium">
            <AiFillDelete />
          </button>
        </td>
      </tr>
    </tbody>
  );
}
