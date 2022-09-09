import { useState, MouseEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { updateUser } from "../../../utils/userApi";

export default function Edit({ user }: any) {
  const [userState, setUserState] = useState<any>(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();


  const handleEdit = async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(user._id, {
        name: userState.name,
        email: userState.email,
      });
      router.push("/admin/users");
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Edit User</h1>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div className={error ? "" : "hidden"}>
            <div
              className="p-4 border rounded text-rose-700 bg-rose-50 border-rose-900/10"
              role="alert"
            >
              <strong className="text-sm font-medium">
                Error updating user
              </strong>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>

            <div className="relative">
              <input
                type="name"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                value={userState?.name}
                onChange={(e) =>
                  setUserState({ ...userState, name: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                value={userState?.email}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                onChange={(e) =>
                  setUserState({ ...userState, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleEdit}
              disabled={loading}
              type="submit"
              className="flex-grow inline-block px-5 py-3 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600"
            >
              {loading ? "Loading..." : "Done"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
