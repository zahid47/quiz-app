import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function User() {
  return (
    <tbody className="divide-y divide-gray-100">
      <tr>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          fh4i7y3iy4kltik3h4oiuo
        </td>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          John Doe
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          john.doe@email.com
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">
          <button className=" hover:bg-sky-600 hover:text-white bg-sky-100 text-sky-600 px-3 py-1.5 rounded text-xs font-medium">
            <AiFillEdit />
          </button>
          <button className="ml-2 hover:bg-rose-600 hover:text-white bg-rose-100 text-rose-600 px-3 py-1.5 rounded text-xs font-medium">
            <AiFillDelete />
          </button>
        </td>
      </tr>
    </tbody>
  );
}
