import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  let history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/auth", data).then(() => {
      console.log(data);
      history.push("/");
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Enter username)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
