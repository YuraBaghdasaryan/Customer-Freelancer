import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink, useParams } from "react-router-dom";
import { registerUser } from "../../features/user/userApi";
import { seletcUser } from "../../features/user/userSlice";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  role: Yup.number().required("role is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string()
    .email("Invalid email adress")
    .required("Email is required"),
});

export const Register: React.FC = React.memo(({}): JSX.Element => {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(seletcUser);

  return (
    <div className="divregister">
      <h1>Register</h1>
      <div className="body1">
        <div className="nav">
          <ul>
            <li>
              <NavLink to={"/register"}>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Sign In</NavLink>
            </li>
          </ul>
        </div>
        <div className="divreg">
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              role: "",
              salary: "",
              description: "",
              profession: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);

              dispatch(registerUser(values))
                .unwrap()
                .then(console.log)
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
            }: any) => (
              <div className="divForm1">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <div className="error">{errors.name}</div>
                  )}
                  <input
                    type="text"
                    className="form-control "
                    placeholder="surname"
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.surname && errors.surname && (
                    <div className="error">{errors.surname}</div>
                  )}
                  <input
                    type="text"
                    className="form-control "
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <div className="error">{errors.email}</div>
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
                    <div className="error">{errors.password}</div>
                  )}
                  <select
                    className="form-control "
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" hidden>
                      {" "}
                      all role
                    </option>
                    <option value="1">CUSTOMER</option>
                    <option value="2">FREELANCER</option>
                  </select>
                  {touched.role && errors.role && (
                    <div className="error">{errors.role}</div>
                  )}
                  {values.role == "2" && (
                    <>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="salary"
                        name="salary"
                        value={values.salary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />{" "}
                      {touched.salary && errors.salary && (
                        <div className="error">{errors.salary}</div>
                      )}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="profession"
                        name="profession"
                        value={values.profession}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.profession && errors.proffesion && (
                        <div className="error">{errors.profession}</div>
                      )}
                    </>
                  )}
                  {values.role == "1" && (
                    <input
                      className="form-control "
                      type="text"
                      placeholder="description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}

                  <button type="submit" className="btn17">
                    Click
                  </button>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
});
