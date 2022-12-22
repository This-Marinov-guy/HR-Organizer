import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import { Heading } from "../UI/Heading";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectErrorMsg } from "src/redux/error";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import classes from "./Authentication.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "src/redux/user";

const LogInForm = () => {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const changeFormInputHandler = (event) => {
    setLoginFormValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const { loading, error, sendRequest } = useHttpClient();

  const dispatch = useDispatch();

  const errorMsg = useSelector(selectErrorMsg);

  return (
    <Fragment>
      {error && <Error errorMessage={errorMsg} />}
      <Heading>Log in your account</Heading>
      <Form
        className={classes.authenticate_display}
        onSubmit={async (event) => {
          event.preventDefault()
          try {
            const responseData = await sendRequest(
              "http://localhost:5000/api/user/login",
              "POST",
              JSON.stringify({
                email: loginFormValues.email,
                password: loginFormValues.password,
              }),
              {
                "Content-Type": "application/json",
              }
            );
            dispatch(login(responseData))
          } catch (err) {}
        }}
      >
        <Input
          label="Email"
          type="email"
          name="email"
          value={loginFormValues.email}
          onChange={(event) => changeFormInputHandler(event)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={loginFormValues.password}
          onChange={(event) => changeFormInputHandler(event)}
        />
        <div className={classes.auth_btns}>
          {loading ? (
            <Loader />
          ) : (
            <Button className={classes.btn} type="submit">
              Log in
            </Button>
          )}
          <Button
            href="/signup"
            className={classes.btn}
            type="submit"
            variant="outline-secondary"
          >
            Not an user
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default LogInForm;