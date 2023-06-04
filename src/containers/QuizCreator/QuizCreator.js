import React, { Component } from "react";
import classses from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import {
  controllCreate,
  validate,
  validateForm,
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import { addQuestion, createQuiz } from "../../store/actions/create";

const createOptionControll = (number) => {
  return controllCreate(
    {
      label: `Вариант ${number}`,
      errorMesage: "Значение не может быть пустым",
      id: number,
    },
    { required: true }
  );
};

const createFormControls = () => {
  return {
    question: controllCreate(
      {
        label: "Введите вопрос",
        errorMesage: "Вопрос не может быть пустым!",
      },
      { required: true }
    ),
    option1: createOptionControll(1),
    option2: createOptionControll(2),
    option3: createOptionControll(3),
    option4: createOptionControll(4),
  };
};

class QuizCreate extends Component {
  state = {
    rightAnswer: 1,
    isFormValid: false,
    formControls: createFormControls(),
  };

  onSubmitHandler = (e) => e.preventDefault();

  onSelectHandler = (e) => {
    this.setState({ rightAnswer: +e.target.value });
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMesage={control.errorMesage}
            onChange={(e) => this.onChangeHandler(e.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  addQuestionHandler = (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4 } =
      this.state.formControls;
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswer: this.state.rightAnswer,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.props.addQuestion(questionItem);

    this.setState({
      rightAnswer: 1,
      isFormValid: false,
      formControls: createFormControls(),
    });
  };

  quizCreateHandler = async (e) => {
    e.preventDefault();

    this.props.createQuiz();

    this.setState({
      rightAnswer: 1,
      isFormValid: false,
      formControls: createFormControls(),
    });
  };
  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswer}
        onChange={this.onSelectHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classses.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.onSubmitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              onClick={this.quizCreateHandler}
              disabled={this.props.quiz.length === 0}
            >
              {" "}
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (questionItem) => dispatch(addQuestion(questionItem)),
    createQuiz: () => dispatch(createQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreate);
