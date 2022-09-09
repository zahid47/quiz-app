import axios from "./axios";
import axiosPrivate from "./axiosPrivate";
import Cookies from "js-cookie";

export const getUsers = async () => {
  const accessToken = Cookies.get("accessToken");

  return await axios.get(`/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMe = async () => {
  const accessToken = Cookies.get("accessToken");

  return await axios.get(`/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUser = async (id: any) => {
  const accessToken = Cookies.get("accessToken");

  return await axios.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const loginUser = async (creds: any) => {
  return await axios.post(`/auth/login`, creds);
};

export const addUser = async (user: any) => {
  return await axios.post("/user", user);
};

export const updateUser = async (id: string, updates: any) => {
  const accessToken = Cookies.get("accessToken");

  return await axiosPrivate.patch(`/user/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteUser = async (id: string) => {
  const accessToken = Cookies.get("accessToken");

  return await axios.delete(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
