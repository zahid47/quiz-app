import React from "react";
import Logo from "./Assets/Logo";

export default function NavBar() {
  return (
    <header className="bg-white">
      <div className="px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-grey-600 font-medium" href="/">
              <span className="sr-only">Home</span>
              <Logo/>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav
              className="md:block"
              aria-labelledby="header-navigation"
            >
              <h2 className="sr-only" id="header-navigation">
                Header navigation
              </h2>

              <ul className="flex items-center text-md gap-6">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
