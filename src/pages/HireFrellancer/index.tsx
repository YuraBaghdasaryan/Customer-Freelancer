import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  FindFrellancerBySkillandSalaryThunk,
  getFreelancerByIdThunk,
  getFreelancerThunk,
  getUsers,
} from "../../features/user/userApi";
import { getSkillsThunk } from "../../features/skill/skillApi";
import { Link } from "react-router-dom";
import { Freelacer } from "../../type";
import * as Yup from "yup";
import { freezeDraftable } from "@reduxjs/toolkit/dist/utils";

export const HireFrellancer: React.FC = React.memo(() => {
  const { freelancers } = useAppSelector((st: RootState) => st.user);
  console.log(freelancers);
  const { user } = useAppSelector((st: RootState) => st.user);
  console.log(user);
  const dispatch = useAppDispatch();
  const { skills } = useAppSelector((st: RootState) => st.skill);
  const [skill, setSkill] = useState<string>("");
  const [minSalary, setMinSalary] = useState<number>();
  const [maxSalary, setMaxSalary] = useState<number>();
  useEffect(() => {
    dispatch(getSkillsThunk());
    dispatch(getFreelancerThunk());
    if (user.freelancer) {
      dispatch(getFreelancerByIdThunk(user.freelancer.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(
      FindFrellancerBySkillandSalaryThunk({
        skill,
        min: minSalary,
        max: maxSalary,
      })
    )
      .unwrap()
      .then(console.warn);
  }, [skill, minSalary, maxSalary]);

  return (
    <div className="divhead">
      <div>
        <h1>Hire Freelancer</h1>
        <h1>All User</h1>
        <div className="hireFreelancer">
          <select value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option value="" disabled>
              Select Skill
            </option>
            {skills.map((elm: any) => (
              <option value={elm.name} key={elm.id}>
                {elm.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min-Salary"
            value={minSalary}
            onChange={(e) => setMinSalary(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max-Salary"
            value={maxSalary}
            onChange={(e) => setMaxSalary(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>See Freelancer</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map((elm: Freelacer) => {
              return (
                <tr key={elm.id}>
                  <td>{elm.user.name}</td>
                  <td>{elm.user.surname}</td>
                  <td>{elm.user.email}</td>
                  <td>
                  <Link to={"/customer/seeFrellancer/"+elm.id}>See</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
