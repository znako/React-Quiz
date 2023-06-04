import { combineReducers } from "@reduxjs/toolkit";
import quiz from "./quiz";
import create from "./create";
import auth from "./auth";

export default combineReducers({ quiz, create, auth });
