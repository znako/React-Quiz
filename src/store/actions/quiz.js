import {
  ANSWER_CLICK_ERROR,
  ANSWER_CLICK_FINISH,
  ANSWER_CLICK_NEXT_QUESTION,
  ANSWER_CLICK_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  ON_RETRY,
} from "./actionTypes";
import axios from "../../axios/axios-quiz/axios-quiz";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get("/quizes.json");
      const quizes = [];
      Object.keys(response.data).forEach((id, index) => {
        quizes.push({
          id,
          name: `Тест №${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizById(id) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quizes/${id}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function onAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState && Object.values(state.answerState)[0] === "success")
      return;

    const question = state.quiz[state.currentQuestion];
    const results = state.results;
    if (question.rightAnswer === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      dispatch(onAnswerClickSuccess({ [answerId]: "success" }, results));

      const timeout = setTimeout(() => {
        if (isEndOfQuiz(state)) {
          dispatch(onAnswerClickFinish());
        } else {
          dispatch(onAnswerClickNextQuestion(state.currentQuestion + 1));
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      dispatch(onAnswerClickError({ [answerId]: "error" }, results));
    }
  };
}
export function onRetry() {
  return {
    type: ON_RETRY,
  };
}
function isEndOfQuiz(state) {
  return state.currentQuestion + 1 === state.quiz.length;
}
function onAnswerClickSuccess(answerState, results) {
  return {
    type: ANSWER_CLICK_SUCCESS,
    answerState,
    results,
  };
}
function onAnswerClickFinish() {
  return {
    type: ANSWER_CLICK_FINISH,
    isFinished: true,
  };
}
function onAnswerClickNextQuestion(currentQuestion) {
  return {
    type: ANSWER_CLICK_NEXT_QUESTION,
    currentQuestion,
    answerState: null,
  };
}
function onAnswerClickError(answerState, results) {
  return {
    type: ANSWER_CLICK_ERROR,
    answerState,
    results,
  };
}
function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}
function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}
function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}
function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}
