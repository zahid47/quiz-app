import axios from "axios";
import Cookies from "js-cookie";

const userApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const getUsers = async () => {
  const response = await userApi.get("/user");
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

export const loginUser = async (user: any) => {
  return await userApi.post(`/auth/login`, user);
};

export const addUser = async (user: any) => {
  return await userApi.post("/user", user);
};

export const updateUser = async (user: any) => {
  return await userApi.patch(`/user/${user.id}`, user);
};

export const deleteUser = async (user: any) => {
  return await userApi.delete(`/user/${user.id}`, user.id);
};

export default userApi;
