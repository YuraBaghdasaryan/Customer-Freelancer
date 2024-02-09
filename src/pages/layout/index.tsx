import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "../../component/Menu";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { profileUser } from "../../features/user/userApi";

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      <Menu />
      <Outlet />
    </div>
  );
};
