import React from "react";
import classes from "./AnswerItem.module.css";

const AnswersItem = (props) => {
  const classArray = [classes.AnswerItem];

  if (props.answerState) {
    classArray.push(classes[props.answerState]);
  }

  return (
    <li
      className={classArray.join(" ")}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswersItem;
