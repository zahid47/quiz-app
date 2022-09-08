import { GetServerSideProps } from "next";
import Edit from "../../../components/Admin/User/Edit";
import axios from "../../../utils/axios";

export default function edit({ user }: any) {
  return <Edit user={user}/>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies["accessToken"];
  const id = context.params?.id;

  const response = await axios.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const user = response.data;

  return {
    props: { user },
  };
};
