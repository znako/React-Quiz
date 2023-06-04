import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.currentQuestion}. </strong>
        {props.question}
      </span>
      <small>
        {props.currentQuestion} из {props.quizLength}
      </small>
    </p>
    <AnswersList
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      answerState={props.answerState}
    />
  </div>
);

export default ActiveQuiz;
