import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
} from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import axios from "axios";
import skillSlice from "../features/skill/skillSlice";
import jobsSlice from "../features/jobs/jobsSlice";

export const store = configureStore({
  reducer: {
    user:userSlice,
    skill:skillSlice,
    jobs:jobsSlice
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const myAxios=axios.create({
  baseURL:"http://localhost:8080/"
})