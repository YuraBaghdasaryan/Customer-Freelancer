import { Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isverify, registerUser } from "../../features/user/userApi";
import { seletcUser } from "../../features/user/userSlice";
import "./style.scss";

export const Verify: React.FC = React.memo(({}): JSX.Element => {
  const [param, serParam] = useSearchParams();
  const dispatch = useAppDispatch();
  console.log(param.get("email"));
  console.log(param.get("emailToken"));
  const navigate = useNavigate()

  useEffect(() => {
    if (param.get("email") && param.get("emailToken"))
      dispatch(
        isverify({
          email: param.get("email"),
          emailToken: param.get("emailToken"),
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          navigate("/")
        });
  }, [param]);

  return (
    <div className="body1">
      <h1>you are not verify</h1>
    </div>
  );
});
