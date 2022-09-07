import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-50">
        <Head>
          <title>Quizifylab</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <NavBar />
        {children}
        <Footer />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
