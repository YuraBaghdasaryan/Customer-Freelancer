import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { useParams } from "react-router-dom";
import { getFreelancerByIdThunk } from "../../../../features/user/userApi";
import "./style.scss"

export const SeeFrellancer: React.FC = React.memo(() => {
  const { freelancer } = useAppSelector((st: RootState) => st.user);
  const dispatch = useAppDispatch();
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      dispatch(getFreelancerByIdThunk(+params.id));
    }
  }, [params.id, dispatch]);
  return (
    <div>
      <div className="Freelancer">
        <h1>
          {freelancer.user?.name} {freelancer.user?.surname}
        </h1>
        <p>Email: {freelancer.user?.email}</p>
        <p>Profession: {freelancer.profession}</p>
        <p>Rate: {freelancer.avg}</p>
        <p>Salary: {freelancer.salary} $</p>
      </div>
    </div>
  );
});
