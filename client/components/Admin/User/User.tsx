import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../utils/userApi";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function User({ user }: any) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      const successToast = toast.success("Successfully Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      queryClient.invalidateQueries("users");
      successToast;
    },
    onError: (error: any) => {
      const errorToast = toast.error("Could not delete the user", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      errorToast;
    },
  });
  return (
    <tbody className="divide-y divide-gray-100">
      <ToastContainer />
      <tr>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          {user._id}
        </td>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          {user.name}
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">{user.email}</td>
        <td className="p-4 text-gray-700 whitespace-normal">
          <button
            onClick={() => {
              router.push(`/admin/users/${user._id}`);
            }}
            className=" hover:bg-sky-600 hover:text-white bg-sky-100 text-sky-600 px-3 py-1.5 rounded text-xs font-medium"
          >
            <AiFillEdit />
          </button>
          <button
            onClick={() => {
              mutation.mutate(user);
            }}
            className="ml-2 hover:bg-rose-600 hover:text-white bg-rose-100 text-rose-600 px-3 py-1.5 rounded text-xs font-medium"
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
    </tbody>
  );
}
