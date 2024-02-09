import { Formik } from "formik";
import React from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { seletcUser } from "../../features/user/userSlice";
import { loginUser } from "../../features/user/userApi";
import "./style.scss";
import Cookies from "js-cookie";
import { ForgotPassword } from "../forgotPassword";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const object = Yup.object({
  email: Yup.string().required("email is required"),
});

export const Login: React.FC = React.memo(() => {
  const { user } = useAppSelector(seletcUser);
  console.log(user);
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="divlogin1">

    <div className="body">
      <h1>Login</h1>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to={"/register"}>Sign Up</NavLink>
          </li>
          <li>
            <NavLink to={"/"}>Sign In</NavLink>
          </li>
        </ul>
      </nav>
      <div className="divlog">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(loginUser(values))
            .unwrap()
            .then((res) => {
              console.log(res);
              Cookies.set("access_token", res.access_token);
              navigate(
                res.role == 0
                ? "/admin/profile"
                : res.role == 1
                ? "/customer/profile"
                : "/freelancer/profile"
                );
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
                placeholder="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                />
              {touched.username && errors.username && (
                <div className="error">
                  <p>{errors.username}</p>
                </div>
              )}
              <input
                type="text"
                className="form-control"
                placeholder="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                />
              {touched.password && errors.password && (
                <div className="error">
                  <p>{errors.username}</p>
                </div>
              )}
              <button type="submit" className="btn1">
                Click
              </button>
              <nav className="nav forgot1">
                <ul>
                  <li>
                    <Link to={"/forgotPassword"}>Forgot Password</Link>
                  </li>
                </ul>
              </nav>
             
            </form>
          )}
        </Formik>
      </div>
    </div>
          </div>
  );
});
