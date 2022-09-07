import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getQuizes } from "../../../utils/quizApi";
import SideBar from "../SideBar";
import Quiz from "./Quiz";

export default function Quizes() {
  const router = useRouter();

  const { isLoading, error, data } = useQuery(["quizes"], () =>
    getQuizes()
  ) as any;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const quizes: any[] = data.data;

  return (
    <SideBar>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold inline mr-4">Quizes</h1>
        <button
          className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-teal-600 hover:text-white"
          onClick={() => {
            router.push("/admin/quizes/add");
          }}
        >
          Add Quiz
        </button>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">ID</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Title</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Questions</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Participants</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Price</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Timer</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Reveal Answer</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Last update</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Actions</div>
                </th>
              </tr>
            </thead>

            {quizes.map((quiz: any) => (
              <Quiz key={quiz._id} quiz={quiz} />
            ))}
          </table>
        </div>
      </div>
    </SideBar>
  );
}
