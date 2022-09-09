import { GetServerSideProps } from "next";
import Answers from "../../../components/Answers";
import { getQuiz } from "../../../utils/quizApi";

export default function answer({ quiz }: any) {
  return <Answers quiz={quiz} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const { data } = await getQuiz(id);

  return {
    props: {
      quiz: data,
    },
  };
};
