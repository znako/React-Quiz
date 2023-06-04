import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = (props) => {
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <span>
                {props.results[quizItem.id] === "success" ? " ✅" : " ❌"}
              </span>
            </li>
          );
        })}
      </ul>
      <p>
        Правильно{" "}
        {
          Object.values(props.results).filter((value) => value === "success")
            .length
        }{" "}
        из {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to={"/"}>
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
