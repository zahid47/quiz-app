import EmptyState from "./Assets/EmptyState";
import Quiz from "./Quiz";

export default function Quizes({ quizes }: any) {
  return (
    <div>
      {quizes.length > 0 ? (
        <div>
          <aside className="overflow-hidden">
            <div className="p-2 md:p-4 lg:px-6 lg:py-8">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Take a quiz!
                </h2>
                <p className="mt-4 text-slate-500">
                  Pick a quiz from bellow and start answering questions.
                </p>
              </div>
            </div>
          </aside>
          <div className="flex flex-wrap justify-center gap-4 m-4">
            {quizes.map((quiz: any) => (
              <Quiz key={quiz._id} quiz={quiz} />
            ))}
          </div>
        </div>
      ) : (
        <div className="block justify-center items-center gap-4 m-4">
          <h1 className="my-10 text-2xl font-bold text-gray-500 md:text-3xl flex justify-center items-center gap-4 m-4">
            No Quiz Found
          </h1>
          <div className="flex justify-center items-center gap-4 m-4 mb-10">
            <EmptyState />
          </div>
        </div>
      )}
    </div>
  );
}
