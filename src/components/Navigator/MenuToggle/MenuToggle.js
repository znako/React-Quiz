import React from "react";
import classes from "./MenuToggle.module.css";

const MenuToggle = (props) => {
  const classArray = [classes.MenuToggle, "fa"];

  props.isOpen
    ? classArray.push("fa-times", classes.open)
    : classArray.push("fa-bars");

  return <i className={classArray.join(" ")} onClick={props.onToggle}></i>;
};

export default MenuToggle;
