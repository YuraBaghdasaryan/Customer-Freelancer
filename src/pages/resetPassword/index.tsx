import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { seletcUser } from "../../features/user/userSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { userResetPassword } from "../../features/user/userApi";
import Cookies from "js-cookie";
import "./style.scss"

const validationSchema = Yup.object({
  code: Yup.number().required("code is required"),
  password: Yup.string().required("password is required"),
  comfirmPassword: Yup.string().required("confirm is required"),
});

export const ResetPassword: React.FC = React.memo(() => {
  const { user } = useAppSelector(seletcUser);
  console.log(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {email} = useParams()

  return (
    <div>
      <h1>Reset Password</h1>
      <div className="resPassword">
        <Formik
          initialValues={{
            code: 0,
            password: "",
            confirm_password: "",
          }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            
            dispatch(userResetPassword({
              email: email || " ",
              obj: values}))
              .unwrap()
              .then((res) => {
                console.log(res);
                if(typeof res == "string"){
                  
                  navigate("/");
                }else{
                  alert(res.message)
                }
                
                
              })
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
                placeholder="code"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.code && errors.code && (
                <div className="error code">
                  <p>{errors.code}</p>
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
                <div className="error password">
                  <p>{errors.password}</p>
                </div>
              )}
              <input
                type="text"
                className="form-control"
                placeholder="confirm_password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
                {touched.confirm_password && errors.confirm_password && (
                <div className="error confirmPassword">
                  <p>{errors.confirm_password}</p>
                </div>
              )}
            
              <button type="submit" className="btn20">
                Reset Password
              </button>
              <Link className="linkss1" to="/">Back to Login</Link>

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
});
