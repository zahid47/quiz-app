import type { NextPage } from "next";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import Quizes from "../components/Quizes";

const Home: NextPage = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Hero/>
      <Quizes />
    </>
  );
};

export default Home;
