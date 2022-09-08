import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Quizifylab</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
