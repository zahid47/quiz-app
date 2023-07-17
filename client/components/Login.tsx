import { loginUser, getMe } from "../utils/userApi";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useUserStore from "../context/userStore";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { registered } = router.query;
  const [creds, setCreds] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const { setUser } = useUserStore();

  const handleLogin = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(creds);

      const accessToken = response.data.accessToken;
      Cookies.set("accessToken", accessToken, { expires: 7 });

      const refreshToken = response.data.refreshToken;
      Cookies.set("refreshToken", refreshToken, { expires: 365 });

      const me = await getMe();

      setUser(me.data);

      const isAdmin = me.data.role === "admin";

      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setError(
        error.response.data.message[0].message || error.response.data.message
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <div className={registered === "true" ? "" : "hidden"}>
        <div
          className="flex items-center justify-between p-4 text-green-700 border rounded border-green-900/10 bg-green-50"
          role="alert"
        >
          <strong className="text-sm font-medium">
            You have successfully registered. Please login to continue.
          </strong>
        </div>
      </div>
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Log into your Account
          </h1>

          <p className="mt-4 text-slate-500">
            Use the admin account to create quizes
          </p>
          <p className="mt-4 text-slate-500">
            email: <b>admin@quizify.test</b> password: <b>sailormoon42</b>
          </p>
          <p className="mt-4 text-rose-500">{error}</p>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                type="email"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
                type="password"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?&nbsp;
              <Link className="underline" href="/register">
                Sign up
              </Link>
            </p>

            <button
              disabled={loading}
              onClick={handleLogin}
              type="submit"
              className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-teal-500 rounded-lg"
            >
              {loading ? "Loading" : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
