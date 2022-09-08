import type { NextPage } from "next";
import Quizes from "../components/Quizes";
import { GetServerSideProps } from "next";
import { getQuizes } from "../utils/quizApi";

const Home: NextPage = ({ quizes }: any) => {
  return <Quizes quizes={quizes} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getQuizes();
  const quizes = response.data;

  return {
    props: { quizes },
  };
};

export default Home;
