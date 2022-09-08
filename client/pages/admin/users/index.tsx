import Users from "../../../components/Admin/User/Users";
import { GetServerSideProps } from "next";
import axios from "../../../utils/axios";

export default function UsersList({ users }: any) {
  return <Users users={users} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies["accessToken"];

  const response = await axios.get("/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const users = response.data;

  return {
    props: { users },
  };
};
