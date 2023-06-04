import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

class Auth extends Component {
  state = {
    idFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  validateControl(value, validation) {
    if (!validation) return true;
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
      console.log();
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isValidForm = true;

    Object.values(formControls).forEach(
      (control) => (isValidForm = control.valid && isValidForm)
    );

    this.setState({
      formControls,
      isValidForm,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(e) => this.onChangeHandler(e, controlName)}
        />
      );
    });
  }

  async loginHandler() {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  }
  async registHandler() {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form
            onClick={(e) => e.preventDefault()}
            className={classes.AuthForm}
          >
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler.bind(this)}
              disabled={!this.state.isValidForm}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registHandler.bind(this)}
              disabled={!this.state.isValidForm}
            >
              Регистарция
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
