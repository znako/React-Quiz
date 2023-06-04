import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const classArray = [classes.Button, classes[props.type]];

  return (
    <button
      className={classArray.join(" ")}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
