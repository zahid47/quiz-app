import Quiz from "./Quiz";

export default function Quizes({ quizes }: any) {
  return (
    <div>
      <aside className="overflow-hidden bg-gray-50">
        <div className="p-2 md:p-4 lg:px-6 lg:py-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Latest Quizes
            </h2>
          </div>
        </div>
      </aside>
      {quizes.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 m-4">
          {quizes.map((quiz: any) => (
            <Quiz key={quiz._id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 m-4">
          {/*TODO: add illustration */}
          <h1>No Quiz Found</h1>
        </div>
      )}
    </div>
  );
}
