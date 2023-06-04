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
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  answerState: null,
  currentQuestion: 0,
  quiz: null,
};

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ANSWER_CLICK_SUCCESS:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case ANSWER_CLICK_FINISH:
      return {
        ...state,
        isFinished: action.isFinished,
      };
    case ANSWER_CLICK_NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion,
        answerState: action.answerState,
      };
    case ANSWER_CLICK_ERROR:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case ON_RETRY:
      return {
        ...state,
        results: {},
        isFinished: false,
        answerState: null,
        currentQuestion: 0,
      };
    default:
      return state;
  }
}
