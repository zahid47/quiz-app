import axios from "axios";
import Cookies from "js-cookie";

const quizApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const getQuizes = async () => {
  return await quizApi.get("/quiz");
};

export const getQuiz = async (id: any) => {
  return await quizApi.get(`/quiz/${id}`);
};

export const addQuiz = async (quiz: any) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;
  return await quizApi.post("/quiz", quiz, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateQuiz = async ({ id, quiz }: any) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;
  return await quizApi.patch(`/quiz/${id}`, quiz, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteQuiz = async (quiz: any) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return;
  return await quizApi.delete(`/quiz/${quiz._id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default quizApi;
