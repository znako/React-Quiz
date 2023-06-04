import { ADD_QUESTION, RESET_CREATE_QUIZ } from "../actions/actionTypes";

const initialState = {
  quiz: [],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.questionItem],
      };
    case RESET_CREATE_QUIZ:
      return {
        ...state,
        quiz: [],
      };
    default:
      return state;
  }
}
