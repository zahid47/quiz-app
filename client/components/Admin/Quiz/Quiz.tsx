import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import { deleteQuiz } from "../../../utils/quizApi";
dayjs.extend(relativeTime);

export default function Quiz({ quiz }: any) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteQuiz(quiz._id);
    router.push("/admin/quizes");
  };

  const handleEdit = () => {
    router.push(`/admin/quizes/${quiz._id}/edit`);
  };

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
          {quiz.timer.timerType === "Per Question"
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

          <button
            onClick={handleDelete}
            className="ml-2 hover:bg-rose-600 hover:text-white bg-rose-100 text-rose-600 px-3 py-1.5 rounded text-xs font-medium"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
}
