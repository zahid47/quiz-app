import Quiz from "./Quiz";
import { useQuery } from "@tanstack/react-query";
import { getQuizes } from "../utils/quizApi";

export default function Quizes() {
  const { isLoading, error, data } = useQuery(["quizes"], getQuizes) as any;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const quizes: any[] = data.data;
  return (
    <div className="flex flex-wrap justify-center gap-4 m-4">
      {quizes.map((quiz: any) => (
        <Quiz key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
}
