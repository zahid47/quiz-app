import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const quizStore = (set: any) => ({
  quiz: {
    isPaid: false,
    answerRevealType: "After each question",
    timer: {
      timerType: "Per Question",
      timerDuration: 60,
    },
  },
  setQuiz: (quiz: any) => set(() => ({ quiz })),
  clearQuiz: () =>
    set(() => ({
      quiz: {
        isPaid: false,
        answerRevealType: "After each question",
        timer: {
          timerType: "Per Question",
          timerDuration: 60,
        },
      },
    })),
});

const useQuizStore = create<any>()(
  devtools(persist(quizStore, { name: "quiz" }))
);

export default useQuizStore;
