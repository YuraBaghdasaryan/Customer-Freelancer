import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Customer, Freelacer, User } from "../../type";
import { FindFrellancerBySkillandSalaryThunk, findCustomerDataByTokenThunk, findCustomerThunk, getFreelancerByIdThunk, getFreelancerThunk, getUsers, loginUser, profileUser, registerUser } from "./userApi";
import { JobsUserFindByJobIdThunk } from "../jobs/jobsApi";

const initialState: { 
  user: User, 
  users:User[] , 
  customer:Customer,
  customers:Customer[],
  freelancer:Freelacer,
  freelancers:Freelacer[]
 } = {
  user: {} as User,
  users:[],
  customer: {} as Customer,
  customers:[],
  freelancer: {} as Freelacer,
  freelancers:[],

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(profileUser.fulfilled, (state, action) => {
      state.user = action.payload;
    }).addCase(getUsers.fulfilled,(state,action)=>{
      state.users=action.payload
    }).addCase(findCustomerThunk.fulfilled,(state,action)=>{
      state.user=action.payload
    }).addCase(findCustomerDataByTokenThunk.fulfilled,(state,action)=>{
      state.customer=action.payload
    })
    .addCase(getFreelancerThunk.fulfilled,(state,action)=>{
      state.freelancers=action.payload
    })
    .addCase(getFreelancerByIdThunk.fulfilled,(state,action)=>{
      state.freelancer=action.payload
    })
    .addCase(FindFrellancerBySkillandSalaryThunk.fulfilled,(state,action)=>{
      state.freelancers=action.payload
    })
   
  },
});

export const seletcUser = (state: RootState) => state.user;
export default userSlice.reducer;
