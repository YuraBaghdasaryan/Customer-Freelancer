import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { useParams } from "react-router-dom";
import {
  DeleteJobUserIdThunk,
  JobsUserFindByJobIdThunk,
  findJobFrellancerIdThunk,
  getJobsByIdThunk,
  getJobsThunk,
  jobsSaveFrellancer,
} from "../../../../features/jobs/jobsApi";
import { getFreelancerByIdThunk } from "../../../../features/user/userApi";
import "./style.scss";

export const SeeApplication: React.FC = React.memo(() => {
  const { job, jobuser } = useAppSelector((st: RootState) => st.jobs);
  const dispatch = useAppDispatch();
  console.log("=>", jobuser, job);
  const params = useParams();

  const SaveApplication = (jobId: number, freelancerId: number) => {
    dispatch(jobsSaveFrellancer({ jobId, freelancerId }))
      .unwrap()
      .then(() => dispatch(getJobsThunk()));
  };
  useEffect(() => {
    if (params.id) {
      const jobId = parseInt(params.id);
      dispatch(getJobsThunk());
      dispatch(getJobsByIdThunk(jobId));
      dispatch(JobsUserFindByJobIdThunk(+params.id));
     
    }
  }, [params.id, dispatch]);

  return (
    <div className="div14">
      <div className="JobApplication">
        <h1>title:{job.title}</h1>
        <p>description:{job.description}</p>
        <p>price:{job.price}</p>


        {
            job.freelancer ?

            <>
            <h3><i>{job.freelancer.user.name}  {job.freelancer.user.surname}</i></h3>
            </>

            :
            <></>
        }
      </div>

      <div className="freelancer">
        {jobuser.map((elm: any) => {
          return (
            <div className="jobuser" key={elm.id}>
              <h1>{elm.freelancer.user.name}</h1>
              <h1>{elm.freelancer.user.surname}</h1>
              <p>Profession:{elm.freelancer.profession}</p>
              <p>Salary:{elm.freelancer.salary}</p>
              <p>Email:{elm.freelancer.user.email}</p>
              <div className="button">
                <button
                  className="save"
                  onClick={() => {
                    SaveApplication(elm.jobId, elm.freelancerId);
                  }}
                >
                  Apply
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    dispatch(DeleteJobUserIdThunk(elm.id))
                      .unwrap()
                      .then(() => {
                        if (params.id) {
                          dispatch(findJobFrellancerIdThunk(+params.id));
                        }
                      });
                  }}
                >
                    Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
