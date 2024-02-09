import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useParams } from "react-router-dom";
import { selectJobs } from "../../../../features/jobs/jobsSlice";
import {
  DeleteJobUserIdThunk,
  JobsUserFindByUserIdThunk,
  createJobsUserThunk,
  deleteJobsByIdThunk,
  getJobsThunk,
} from "../../../../features/jobs/jobsApi";
import { getSkillsThunk } from "../../../../features/skill/skillApi";
import { Jobs } from "../../../../type";
import "./style.scss";
import { RootState } from "../../../../app/store";
import { getFreelancerByIdThunk } from "../../../../features/user/userApi";

export const AllJobsFreelancer: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { jobs, jobuser } = useAppSelector(selectJobs);
  const { user, freelancer } = useAppSelector((state) => state.user);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [data, setdata] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);

  console.log("=>", freelancer, jobuser);

  useEffect(() => {
    dispatch(getJobsThunk()).unwrap();
    dispatch(getSkillsThunk()).unwrap();
    if (user.freelancer) {
      dispatch(JobsUserFindByUserIdThunk(user.freelancer.id))
      dispatch(getFreelancerByIdThunk(user.freelancer.id));
    }
  }, [dispatch, user, modalOpen]);

  const handleStatusChange = (status: any) => {};

  return (
    <div>
      <h1>All Jobs Freelancer</h1>
      <select
        value={selectedStatus || ""}
        onChange={(e) => {
          handleStatusChange(e.target.value);
        }}
      >
        {""}
        <option value="">All</option>
        <option value="0">Start</option>
        <option value="1">Process</option>
        <option value="2">Finished</option>
      </select>
      <table className="table2">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th>apply</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((elm) => {
            return (
              <tr key={elm.id}>
                <td>{elm.title}</td>
                <td>{elm.description}</td>
                <td>{elm.price}</td>
                <td>
                  {elm.status}
                  <br />

                  {elm.status == 0 ? (
                    <div>
                      {jobuser.some((el) => el.jobId == elm.id) ? (
                        <button
                        className="button1"
                          onClick={() => {
                            const x = jobuser.find((el) => el.jobId == elm.id);
                            if (x) {
                              dispatch(DeleteJobUserIdThunk(x.id))
                                .unwrap()
                                .then(() => {
                                  setModalOpen(!modalOpen);
                                });
                            }
                          }}
                        >
                          Delete to apply
                        </button>
                      ) : (
                        <button
                        className="button1"
                          onClick={() => {
                            dispatch(createJobsUserThunk({ jobId: elm.id }))
                              .unwrap()
                              .then(() => {
                                setModalOpen(!modalOpen);
                              });
                          }}
                        >
                          apply
                        </button>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
