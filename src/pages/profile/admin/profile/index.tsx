import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { profileUser } from "../../../../features/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { Admin } from "../adminProfile";
import { Customer } from "../../customer/profile";
import { Freelancer } from "../../freelancer";
import { RootState } from "../../../../app/store";

export const Profile: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((st: RootState) => st.user);

  useEffect(() => {
    dispatch(profileUser())
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        navigate("/");
      });
  }, [dispatch, navigate]);

  return (
    <div>
      <h3>
        {user.name} {user.surname}
      </h3>
      <div>
        {user.role == 0 ? (
          <Admin />
        ) : user.role == 1 ? (
          <Customer />
        ) : (
          <Freelancer />
        )}
      </div>
    </div>
  );
});
