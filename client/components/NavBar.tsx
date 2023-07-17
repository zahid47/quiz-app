import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useUserStore from "../context/userStore";
import Logo from "./Assets/Logo";

export default function NavBar() {
  const router = useRouter();

  const { user, setUser } = useUserStore();
  const [userState, setUserState] = useState<any>({});

  useEffect(() => {
    setUserState(user);
  }, [user]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUser({});
    setUserState({});
    router.push("/");
  };

  return (
    <div>
      <header className="bg-white">
        <div className="px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-grey-600 font-medium" href="/">
                <div className="cursor-pointer">
                  <Logo />
                </div>
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav className="md:block" aria-labelledby="header-navigation">
                <h2 className="sr-only" id="header-navigation">
                  Header navigation
                </h2>

                {Cookies.get("accessToken") && userState.name ? (
                  <ul className="flex items-center text-sm gap-6">
                    {user.role === "admin" && (
                      <li>
                        <Link
                          href="/admin/quizes"
                          className="bg-amber-100 text-amber-700 transition hover:bg-amber-600 hover:text-white block px-3 py-1.5 rounded text-xs font-medium"
                        >
                          Create a quiz
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        className="bg-amber-100 text-amber-700 transition hover:bg-amber-600 hover:text-white block px-3 py-1.5 rounded text-xs font-medium"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="flex items-center text-md gap-6">
                    <li>
                      <button
                        className="cursor-pointer bg-teal-100 text-teal-700 transition hover:bg-teal-600 hover:text-white block px-3 py-1.5 rounded text-xs font-medium"
                        onClick={() => {
                          router.push("/login");
                        }}
                      >
                        Login
                      </button>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
