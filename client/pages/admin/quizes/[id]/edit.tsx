import Edit from "../../../../components/Admin/Quiz/Edit";
import { GetServerSideProps } from "next";
import { getQuiz } from "../../../../utils/quizApi";

export default function edit() {
  return <Edit />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const { data } = await getQuiz(id);

  return {
    props: { user: data },
  };
};
