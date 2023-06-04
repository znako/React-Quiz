import React, { Component } from "react";
import classes from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

function Drawer(props) {
  const renderLinks = (links) => {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          className={({ isActive }) => (isActive ? classes.active : "")}
          onClick={props.onClose}
        >
          {link.label}
        </NavLink>
      </li>
    ));
  };

  const classArray = [classes.Drawer];
  if (!props.isOpen) classArray.push(classes.close);

  const links = [{ to: "/", label: "Все тесты" }];

  if (props.isAuth) {
    links.push(
      { to: "/quiz-creator", label: "Создать тест" },
      { to: "/logout", label: "Выйти" }
    );
  } else {
    links.push({ to: "/auth", label: "Авторизация" });
  }

  return (
    <>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
      <nav className={classArray.join(" ")}>
        <ul>{renderLinks(links)}</ul>
      </nav>
    </>
  );
}

export default Drawer;
