import { GetServerSideProps } from "next";
import Quizes from "../../../components/Admin/Quiz/Quizes";
import { getQuizes } from "../../../utils/quizApi";

export default function QuizList({ quizes }: any) {
  return <Quizes quizes={quizes} />;
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const response = await getQuizes();
  const quizes = response.data;

  return {
    props: { quizes },
  };
};
