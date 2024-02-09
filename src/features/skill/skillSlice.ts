import { createSlice } from "@reduxjs/toolkit";
import {
  FindJobSkillByIdThunk,
  getSkillsByIdThunk,
  getSkillsThunk,
} from "./skillApi";
import { Skills } from "../../type";
import { RootState } from "../../app/store";

const initialState: { skil: Skills, skills:Skills[]} = {
  skil: {} as Skills,
  skills:[]
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getSkillsThunk.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(getSkillsByIdThunk.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(FindJobSkillByIdThunk.fulfilled, (state, action) => {
        state.skills = action.payload;
      });
  },
});

export const selectSkill = (state: RootState) => state.skill;
export default skillSlice.reducer;
