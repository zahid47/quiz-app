import axios from "axios";
import Cookies from "js-cookie";

const userApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const getUsers = async () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;
  const response = await userApi.get("/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getMe = async () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;
  return await userApi.get(`/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUser = async (id: any) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;

  return await userApi.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const loginUser = async (user: any) => {
  return await userApi.post(`/auth/login`, user);
};

export const addUser = async (user: any) => {
  return await userApi.post("/user", user);
};

export const updateUser = async ({ id, user }: any) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;
  return await userApi.patch(`/user/${id}`, user, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteUser = async (user: any) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;
  return await userApi.delete(`/user/${user._id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default userApi;
