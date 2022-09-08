import QuizDetails from "../../../components/QuizDetails";
import { GetServerSideProps } from "next";
import { getQuiz } from "../../../utils/quizApi";

export default function _QuizDetails({ quiz }: any) {
  return <QuizDetails quiz={quiz} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const response = await getQuiz(id);
  const quiz = response.data;

  return {
    props: { quiz },
  };
};
