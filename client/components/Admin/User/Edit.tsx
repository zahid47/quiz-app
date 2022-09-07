import { updateUser, getUser } from "../../../utils/userApi";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Register() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [_error, _setError] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      router.push("/admin/users");
    },
    onError: () => {
      _setError(true);
    },
  });

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    mutation.mutate({ id, user });
    setLoading(false);
  };

  const { isLoading, error, data } = useQuery(["user"], () =>
    getUser(id)
  ) as any;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Edit User</h1>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div className={_error ? "" : "hidden"}>
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
                placeholder={data?.data.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                placeholder={data?.data.email}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
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
