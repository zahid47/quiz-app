import SideBar from "../SideBar";
import User from "./User";

export default function Users() {
  return (
    <SideBar>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-normal">
                  <div className="flex items-center">ID</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-normal cursor-pointer">
                  <div className="flex items-center">
                    Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 ml-1.5 text-gray-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-normal">
                  <div className="flex items-center">Email Address</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-normal">
                  <div className="flex items-center">Actions</div>
                </th>
              </tr>
            </thead>

            <User />
          </table>
        </div>
      </div>
    </SideBar>
  );
}
