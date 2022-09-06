import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Quiz() {
  return (
    <tbody className="divide-y divide-gray-100">
      <tr>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          fh4i7y3iy4kltik3h4oiuo
        </td>
        <td className="p-4 font-medium text-gray-900 whitespace-normal">
          Are you a real duck???
        </td>
        <td className="p-4 text-gray-700 whitespace-normal">10</td>
        <td className="p-4 text-gray-700 whitespace-normal">69</td>
        <td className="p-4 text-gray-700 whitespace-normal">$15</td>
        <td className="p-4 text-gray-700 whitespace-normal">60 sec/ques</td>
        <td className="p-4 text-gray-700 whitespace-normal">10 hours ago</td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
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
