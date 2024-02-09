import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  addJobsByIdThunk,
  getJobsThunk,
} from "../../../../features/jobs/jobsApi";
import { selectJobs } from "../../../../features/jobs/jobsSlice";
import skillSlice, { selectSkill } from "../../../../features/skill/skillSlice";
import { getSkillsThunk } from "../../../../features/skill/skillApi";
import "./style.scss";

const object = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  price: Yup.number().required("price is required"),
  skills: Yup.array(),
});

export const Customer: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { jobs } = useAppSelector(selectJobs);
  const { skills } = useAppSelector(selectSkill);
  console.log(jobs);

  useEffect(() => {
    dispatch(getJobsThunk());
    dispatch(getSkillsThunk());
  }, []);

  return (
    <div className="divcus">
      <h1>Customer</h1>
      <img src="/images/12.jpg" width={1200} height={720} />

    </div>
  );
});
