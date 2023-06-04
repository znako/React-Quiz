import Layout from "./hoc/Layout/Layout";

import { Route, Routes, Navigate } from "react-router-dom";

import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Quiz from "./containers/Quiz/Quiz";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./store/actions/auth";

function App(props) {
  props.autoLogin();

  let routes = (
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (props.isAuth) {
    routes = (
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz-creator" element={<QuizCreator />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  return <Layout>{routes}</Layout>;
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
