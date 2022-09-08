import axios from "./axios";
import Cookies from "js-cookie";

export const getQuizes = async () => {
  return await axios.get("/quiz");
};

export const getQuiz = async (id: string) => {
  return await axios.get(`/quiz/${id}`);
};

export const addQuiz = async (quiz: any) => {
  const accessToken = Cookies.get("accessToken");
  return await axios.post("/quiz", quiz, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateQuiz = async (id: string, updates: any) => {
  const accessToken = Cookies.get("accessToken");
  return await axios.patch(`/quiz/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteQuiz = async (id: string) => {
  const accessToken = Cookies.get("accessToken");
  return await axios.delete(`/quiz/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
