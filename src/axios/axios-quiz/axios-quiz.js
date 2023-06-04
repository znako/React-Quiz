import axios from "axios";

export default axios.create({
  baseURL: "https://react-quiz-fc976-default-rtdb.firebaseio.com/",
});
