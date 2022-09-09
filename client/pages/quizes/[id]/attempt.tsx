import { GetServerSideProps } from "next";
import Attempt from "../../../components/Attempt";
import { getQuiz } from "../../../utils/quizApi";

export default function attempt({ quiz }: any) {
  return <Attempt quiz={quiz} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const { data } = await getQuiz(id);

  return {
    props: {
      quiz: data,
    },
  };
};
