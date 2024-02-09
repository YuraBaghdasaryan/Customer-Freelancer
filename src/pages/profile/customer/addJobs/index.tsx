import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Form, useParams } from "react-router-dom";
import {
  addJobsByIdThunk,
  deleteJobsByIdThunk,
  getJobsThunk,
  patchJobsByIdThunk,
} from "../../../../features/jobs/jobsApi";
import {
  deleteSkillsByIdThunk,
  getSkillsThunk,
} from "../../../../features/skill/skillApi";
import { Formik } from "formik";
import { selectJobs } from "../../../../features/jobs/jobsSlice";
import { selectSkill } from "../../../../features/skill/skillSlice";
import { Jobs } from "../../../../type";
const object = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  price: Yup.number().required("price is required"),
  skills: Yup.array(),
});

export const AddJobs: React.FC = React.memo(({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { jobs } = useAppSelector(selectJobs);
  const { skills } = useAppSelector(selectSkill);
  console.log(jobs);
  const [selectedJobs, setSelectedJobs] = useState<Jobs | null>(null);

  useEffect(() => {
    dispatch(getSkillsThunk());
    dispatch(getJobsThunk())
  }, [dispatch]);
  const openUbdateWindow = (job: Jobs) => {
    setSelectedJobs(job);
  }

  return (
    <div className="jobdiv">
      <h1>Add Jobs</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: 0,
          skills: [],
        }}
        validationSchema={object}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          dispatch(addJobsByIdThunk({ ...values, skills: [1, 2] }))
            .unwrap()
            .then(() => {
              resetForm();
              setSelectedJobs(null);
              dispatch(getSkillsThunk());
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch(console.warn);
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
              name="title"
              className="form-control"
              placeholder="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title && <p>{errors.title}</p>}
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <p>{errors.description}</p>
            )}
            <input
              type="text"
              name="price"
              className="form-control"
              placeholder="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price && <p>{errors.price}</p>}

            <select
              className="select1"
              multiple
              name="skills"
              value={values.skills}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {""}
              {skills.map((elm, i) => {
                return (
                  <option key={i} value={elm.id}>
                    {elm.name}{" "}
                  </option>
                );
              })}
            </select>
            <button type="submit" className="btn btn-dark">
              Add Jobs
            </button>
          </form>
        )}
      </Formik>

     
    </div>
  );
});
