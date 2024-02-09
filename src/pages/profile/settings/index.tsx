import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import {
  deleteUserThunk,
  getUsers,
  userChangeNameSurnameThunk,
  userChangePasswordThunk,
} from "../../../features/user/userApi";
import * as Yup from "yup";
import { RootState } from "../../../app/store";
import { Formik } from "formik";
import "./style.scss";
import { deleteJobsByIdThunk } from "../../../features/jobs/jobsApi";
import Swal from "sweetalert2";

const nameSurnameValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
});

const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("currentPassword is required"),
  password: Yup.string().required("password is required"),
  confiramtionPassword: Yup.string().required("confirmation is required"),
});

export const Settings: React.FC = React.memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((st: RootState) => st.user);
  console.log(user);
  const params = useParams();


  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <h1> All Settings</h1>
      <h1>Change Name & Surname</h1>
      <Formik
        initialValues={{
          name: "",
          surname: "",
        }}
        validationSchema={nameSurnameValidationSchema}
        onSubmit={(values,{resetForm}) => {
          console.log(values, user);
          dispatch(userChangeNameSurnameThunk({ id: user.id, obj: values }))
            .unwrap()
            .then(console.log);
            resetForm()
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            
            });
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
          <div className="divsform">
            <form onSubmit={handleSubmit} className="formik">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && <p>{errors.name}</p>}
              <input
                type="text"
                placeholder="Surname"
                name="surname"
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.surname && touched.surname && <p>{errors.surname}</p>}

              <button type="submit" className="btn10">
                Click
              </button>
            </form>
          </div>
        )}
      </Formik>
      <h1>Change Password</h1>
      <Formik
        initialValues={{
          currentPassword: "",
          password: "",
          confirmationPassword: "",
        }}
        // validationSchema={passwordValidationSchema}
        onSubmit={(value, { resetForm }) => {
          console.log(value);
          dispatch(userChangePasswordThunk({ ...value }))
            .unwrap()
            .then((e) => {
              console.log(e);
              resetForm();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              
              });
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          resetForm,
        }) => (
          <div className="divsform1">
            <form onSubmit={handleSubmit} className="formik2">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.currentPassword && touched.currentPassword && (
                <p className="p1">{errors.currentPassword}</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && <p>{errors.password}</p>}
              <input
                type="password"
                name="confirmationPassword"
                placeholder="Confirmation Password"
                value={values.confirmationPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmationPassword && touched.confirmationPassword && (
                <p>{errors.confirmationPassword}</p>
              )}

              <button className="btn11" type="submit">
                Click
              </button>
            </form>
          </div>
        )}
      </Formik>
      <h1>
      
      </h1>
    </div>
  );
});