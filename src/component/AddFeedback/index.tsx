import { Formik } from "formik";
import "./style.scss";
import * as Yup from "yup";
import { Freelacer } from "../../type";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getFreelancerThunk } from "../../features/user/userApi";
import { FeedBackJobIdThunk } from "../../features/jobs/jobsApi";

const object = Yup.object({
  rate: Yup.number()
    .required("Rate is required")
    .min(1, "Rate must be at least 1")
    .max(100, "Rate cannot be more than 5"),
  text: Yup.string().required("title is required"),
});

export const AddFeedback = ({ selectedFeedbackJob }: any) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="feedback-form">
        <h2>Add Feedback</h2>
        <Formik
          initialValues={{
            rate: "",
            text: "",
          }}
          validationSchema={object}
          onSubmit={(values, { resetForm }) => {
            if (selectedFeedbackJob) {
              console.log(values, selectedFeedbackJob);
              dispatch(
                FeedBackJobIdThunk({
                  id: selectedFeedbackJob.id,
                  obj: values,
                })
              )
                .unwrap()
                .then(console.warn);
            }
            resetForm();
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="text"
                className=""
                placeholder="text"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.text && errors.text && (
                <div className="error">
                  <p>{errors.text}</p>
                </div>
              )}
              <input
                type="number"
                name="rate"
                className=""
                placeholder="rate"
                value={values.rate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.rate && errors.rate && (
                <div className="error">
                  <p>{errors.rate}</p>
                </div>
              )}
              <button type="submit">add</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
