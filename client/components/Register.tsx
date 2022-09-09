import { addUser } from "../utils/userApi";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addUser(creds);
      router.push("/login?registered=true");
    } catch (error: any) {
      setError(
        error.response.data.message[0].message || error.response.data.message
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Create a new Account
          </h1>

          <p className="mt-4 text-rose-500 font-medium">{error}</p>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          {/* ~~~~~~~~name~~~~~~~~ */}
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>

            <div className="relative">
              <input
                type="name"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter name"
                onChange={(e) => setCreds({ ...creds, name: e.target.value })}
              />
            </div>
          </div>

          {/* ~~~~~~~~email~~~~~~~~ */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              />
            </div>
          </div>

          {/* ~~~~~~~~password~~~~~~~~ */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* ~~~~~~~~sign in instead~~~~~~~~ */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Already have an account?&nbsp;
              <Link className="underline" href="/login">
                Sign in
              </Link>
            </p>

            {/* ~~~~~~~~CTA~~~~~~~~ */}
            <button
              onClick={handleRegister}
              disabled={loading}
              type="submit"
              className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-teal-500 rounded-lg"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
