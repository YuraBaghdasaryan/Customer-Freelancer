import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getFreelancerByIdThunk } from "../../../features/user/userApi";
import "./style.scss";

export const Freelancer: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { user, freelancer } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.freelancer) {
      dispatch(getFreelancerByIdThunk(user.freelancer.id));
    }
  }, [dispatch, user]);
  return (
    <div>

      <div className="freelancerById">
        <h1>
          {user.name}
          {user.surname}
        </h1>
        <p>Email: {user?.email}</p>
        <p>{freelancer.salary}</p>
        <p>{freelancer.profession}</p>
        <p>{freelancer.avg}</p>
      </div>
      <h1>Freelancer</h1>
      <img className="img1" src="/images/8.jpeg" width={800} height={450} />
    </div>
  );
});
