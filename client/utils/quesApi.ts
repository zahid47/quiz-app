import axios from "./axios";
import Cookies from "js-cookie";

export const getQuestions = async () => {
  return await axios.get("/question");
};

export const getQuestion = async (id: string) => {
  return await axios.get(`/question/${id}`);
};

export const addQuestion = async (question: any) => {
  const accessToken = Cookies.get("accessToken");
  return await axios.post("/question", question, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateQuestion = async (id: string, updates: any) => {
  const accessToken = Cookies.get("accessToken");
  return await axios.patch(`/question/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteQuestion = async (id: string) => {
  const accessToken = Cookies.get("accessToken");
  return await axios.delete(`/question/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
