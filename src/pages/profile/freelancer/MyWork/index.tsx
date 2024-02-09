import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useParams } from "react-router-dom";
import {
  findJobFrellancerIdThunk,
  getJobsThunk,
  jobsUpdateThunk,
} from "../../../../features/jobs/jobsApi";
import "./style.scss";
import { Freelancer } from "..";
import { useSelector } from "react-redux";

export const SeeWork: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { jobs } = useAppSelector((state) => state.jobs);
  console.log("==>", jobs);
  const params = useParams();
  const { user } = useAppSelector((state) => state.user);
  console.log(user);
  const [selectedStatus, setSelectedStatus] = useState(0);

  useEffect(() => {
    if (user.freelancer) {
      dispatch(findJobFrellancerIdThunk(user.freelancer.id));
    }
  }, [user, dispatch]);

  return (
    <div>
      <h1>SeeWork</h1>
      <table className="table1">
        <thead>
          <tr>
            <th>description</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((elm) => {
            return (
              <tr key={elm.id}>
                <td>{elm.description}</td>
                <td>{elm.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
