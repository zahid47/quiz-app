import { GetServerSideProps } from "next";
import SideBar from "../../components/Admin/SideBar";
import { getQuizes } from "../../utils/quizApi";
import { getUsers } from "../../utils/userApi";

export default function admin({ users, quizes }: any) {
  return (
    <SideBar>
      <h1 className="mb-6">Dashboard</h1>
      <div className="flex gap-4">
        <div className="inline justify-start items-center">
          <article className="flex items-end justify-between p-6 bg-white border border-gray-100 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>

              <p className="text-2xl font-medium text-gray-900">
                {users.length}
              </p>
            </div>
          </article>
        </div>

        <div className="inline justify-start items-center">
          <article className="flex items-end justify-between p-6 bg-white border border-gray-100 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Total Quizes</p>

              <p className="text-2xl font-medium text-gray-900">
                {quizes.length}
              </p>
            </div>
          </article>
        </div>
      </div>
    </SideBar>
  );
}

export const getServerSideProps: GetServerSideProps = async (_) => {

  const res1 = await getUsers();
  const res2 = await getQuizes();

  return {
    props: {
      users: res1.data,
      quizes: res2.data,
    },
  };
};
