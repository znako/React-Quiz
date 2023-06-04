import { ADD_QUESTION, RESET_CREATE_QUIZ } from "./actionTypes";
import axios from "../../axios/axios-quiz/axios-quiz";

export function addQuestion(questionItem) {
  return {
    type: ADD_QUESTION,
    questionItem,
  };
}

function resetCreateQuiz() {
  return {
    type: RESET_CREATE_QUIZ,
  };
}

export function createQuiz() {
  return async (dispatch, getState) => {
    await axios.post("/quizes.json", getState().create.quiz);

    dispatch(resetCreateQuiz());
  };
}
