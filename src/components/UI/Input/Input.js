import React from "react";
import classes from "./Input.module.css";

const isInvalid = ({ valid, shouldValidate, touched }) =>
  !valid && shouldValidate && touched;
export default function Input(props) {
  const classArray = [classes.Input];
  const inputType = props.type || "text";
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) classArray.push(classes.invalid);

  return (
    <div className={classArray.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || "Введите корректные данные!"}</span>
      ) : null}
    </div>
  );
}
