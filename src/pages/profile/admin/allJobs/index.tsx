import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectSkill } from "../../../../features/skill/skillSlice";
import { seletcUser } from "../../../../features/user/userSlice";
import { selectJobs } from "../../../../features/jobs/jobsSlice";
import {
  deleteJobsByIdThunk,
  getJobsThunk,
  patchJobsByIdThunk,
} from "../../../../features/jobs/jobsApi";
import { useParams } from "react-router-dom";
import { Jobs } from "../../../../type";
import "./style.scss";
import Swal from "sweetalert2";
import { getSkillsThunk } from "../../../../features/skill/skillApi";
import * as Yup from "yup";
import { Formik } from "formik";

const object = Yup.object({
  title: Yup.string().required("Name is Required"),
});

export const AllJobs: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { jobs } = useAppSelector(selectJobs);
  console.log(jobs);
  const [selectedJobs, setSelectedJobs] = useState<Jobs | null>(null);
  useEffect(() => {
    dispatch(getJobsThunk()).unwrap();
    dispatch(getSkillsThunk()).unwrap();
  }, [dispatch]);

  const openUbdateWindow = (jobs: Jobs) => {
    setSelectedJobs(jobs);
  };

  return (
    <div className="divjobs">
      <h1>All Jobs</h1>
      <table className="table1">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((elm) => {
            return (
              <tr key={elm.id}>
                <td>{elm.title}</td>
                <td>{elm.description}</td>
                <td>{elm.price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      dispatch(deleteJobsByIdThunk(elm.id))
                        .unwrap()
                        .then(() => {
                          setSelectedJobs(null);
                          dispatch(getJobsThunk());
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        })
                    }
                  >
                    &times;
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
