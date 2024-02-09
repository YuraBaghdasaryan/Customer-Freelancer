import { createSlice } from "@reduxjs/toolkit";
import { Root } from "react-dom/client";
import { RootState } from "../../app/store";
import {
  JobsUserFindByJobIdThunk,
  JobsUserFindByUserIdThunk,
  findCustomerDataByTokenJobsThunk,

  findJobFrellancerIdThunk,

  findJobsByCustomerIdThunk,
  findJobsByFreeLancerGetRateFeedBackThunk,
  findJobsByStatus,
  getJobsByIdThunk,
  getJobsThunk,
} from "./jobsApi";
import { FindJobSkillByIdThunk } from "../skill/skillApi";
import { JobFreelancer, Jobs } from "../../type";

const initialState: { job: Jobs; jobs: Jobs[] , jobuser:JobFreelancer[]} = {
  job: {  } as Jobs,
  jobs: [],
  jobuser:[]
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getJobsThunk.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(getJobsByIdThunk.fulfilled, (state, action) => {
        state.job = action.payload;
      })
      .addCase(findJobsByStatus.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(findJobFrellancerIdThunk.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(
        findJobsByFreeLancerGetRateFeedBackThunk.fulfilled,
        (state, action) => {
          state.job = action.payload;
        }
      )
      .addCase(findJobsByCustomerIdThunk.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(findCustomerDataByTokenJobsThunk.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(JobsUserFindByJobIdThunk.fulfilled, (state, action) => {
        state.jobuser = action.payload;
      })
      .addCase(JobsUserFindByUserIdThunk.fulfilled, (state, action) => {
        state.jobuser = action.payload;
      });
  },
});

export const selectJobs = (state: RootState) => state.jobs;
export default jobsSlice.reducer;
