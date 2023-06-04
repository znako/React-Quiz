import React, { Component } from "react";
import { useParams } from "react-router-dom";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import {
  fetchQuizById,
  onAnswerClick,
  onRetry,
} from "../../store/actions/quiz";

class Quiz extends Component {
  onAnswerClickHandler = (answerId) => {
    this.props.onAnswerClick(answerId);
  };

  componentDidMount() {
    this.props.fetchQuizById(this.props.params.id);
  }
  componentWillUnmount() {
    this.props.onRetry();
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.onRetry}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.currentQuestion].answers}
              question={this.props.quiz[this.props.currentQuestion].question}
              quizLength={this.props.quiz.length}
              currentQuestion={this.props.currentQuestion + 1}
              answerState={this.props.answerState}
              onAnswerClick={this.onAnswerClickHandler}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    answerState: state.quiz.answerState,
    currentQuestion: state.quiz.currentQuestion,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    onAnswerClick: (answerId) => dispatch(onAnswerClick(answerId)),
    onRetry: () => dispatch(onRetry()),
  };
}

const withProps = (Component) => (props) =>
  <Component {...props} params={useParams()} />;

export default connect(mapStateToProps, mapDispatchToProps)(withProps(Quiz));
