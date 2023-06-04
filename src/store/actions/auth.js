import axios from "axios";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const loginData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = "";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt7BxCzKF6XEV9uz_GcV2py5rT4g-d4Sw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt7BxCzKF6XEV9uz_GcV2py5rT4g-d4Sw";
    }

    const response = await axios.post(url, loginData);
    const data = response.data;
    const expiresDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expiresDate", expiresDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiresDate");
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const expiresDate = new Date(localStorage.getItem("expiresDate"));

      if (expiresDate <= new Date()) {
        return dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expiresDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
