import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteUser } from "../../../utils/userApi";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function User({ user }: any) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteUser(user._id);
    router.push("/admin/users");
  };

  const handleEdit = async () => {
    router.push(`/admin/users/${user._id}/edit`);
  };

  return (
    <tbody className="divide-y divide-gray-100">
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
            onClick={handleEdit}
            className=" hover:bg-sky-600 hover:text-white bg-sky-100 text-sky-600 px-3 py-1.5 rounded text-xs font-medium"
          >
            <AiFillEdit />
          </button>
          <button
            onClick={handleDelete}
            className="ml-2 hover:bg-rose-600 hover:text-white bg-rose-100 text-rose-600 px-3 py-1.5 rounded text-xs font-medium"
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
    </tbody>
  );
}
