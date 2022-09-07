import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50">
      <NavBar/>
      {children}
      <Footer />
    </div>
  );
}
