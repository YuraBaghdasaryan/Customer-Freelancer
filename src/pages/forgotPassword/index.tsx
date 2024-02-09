import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { seletcUser } from "../../features/user/userSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import { userForgotPassword } from "../../features/user/userApi";
import Cookies from "js-cookie";
import "./style.scss"

const object = Yup.object({
  email: Yup.string().required("email is required"),
});

export const ForgotPassword: React.FC = React.memo(() => {
  const { user } = useAppSelector(seletcUser);
  console.log(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Forgot-Password</h1>
      <div className="forgotPassword1">
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={object}
          onSubmit={(values) => {
            dispatch(userForgotPassword(values))
              .unwrap()
              .then((res) => {
                console.log(res);
                navigate("/resetPassword/"+values.email);
              })
              .catch(console.log);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <div className="error">
                  <p>{errors.email}</p>
                </div>
              )}
              <button type="submit" className="btn18">
                Forgot Password
              </button>
              <Link className="linkss" to="/">Back to Login</Link>

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
});
