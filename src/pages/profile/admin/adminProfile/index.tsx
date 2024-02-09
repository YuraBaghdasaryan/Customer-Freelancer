import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import "./style.scss";

import {
  addSkillsByIdThunk,
  getSkillsThunk,
} from "../../../../features/skill/skillApi";
import { Formik } from "formik";
import { RootState } from "../../../../app/store";
import { selectSkill } from "../../../../features/skill/skillSlice";
import {
  deleteJobsByIdThunk,
  getJobsThunk,
} from "../../../../features/jobs/jobsApi";
import { profileUser } from "../../../../features/user/userApi";
import { selectJobs } from "../../../../features/jobs/jobsSlice";

const object = Yup.object({
  name: Yup.string().required("Name is Required"),
});
export const Admin: React.FC = React.memo(() => {
  return (
    <div className="divad">
      <h1>Admin</h1>
      <img src="/images/1.jpeg" width={950} height={650} />
    </div>
  );
});

/////http://localhost:8080/api#/
