import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { profileUser } from "../../features/user/userApi";
import { RootState } from "../../app/store";
import Cookies from "js-cookie";

export const Menu: React.FC = React.memo(({}): JSX.Element => {
  const { user } = useAppSelector((st: RootState) => st.user);
  const [url, setUrl] = useState<string>("");
  const navigate = useNavigate();
  const handleSignOut = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  useEffect(() => {
    setUrl(
      user.role == 0
        ? "/admin/"
        : user.role == 1
        ? "/customer/"
        : "/freelancer/"
    );
  }, [user]);
  return (
    <div className="menu">
      <nav className="nav">
        {user.id ? (
          <ul>
            <li>
              <Link to={url + "profile"}>Profile</Link>
            </li>
            {user.role == 0 ? (
              <>
                <li>
                  <NavLink to={url + "allJobs"}>All Jobs</NavLink>
                </li>

                <li>
                  <NavLink to={url + "allUser"}>All User</NavLink>
                </li>
                <li>
                  <NavLink to={url + "addSkills"}>Add Skills</NavLink>
                </li>
              </>
            ) : user.role == 1 ? (
              <>
                <li>
                  <NavLink to={url + "addJobs"}>Add-Jobs</NavLink>
                  <NavLink to={url + "myJobs"}>My-Jobs</NavLink>
                  <NavLink to={url + "HireFreelancer"}>Hire-Freelancer</NavLink>
                  {/* <NavLink to={url + "seeApplication"}>See-Application</NavLink> */}
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={url + "MyWork"}>MyWork</NavLink>
                  <NavLink to={url + "AllJobsFrellancer"}>All Jobs</NavLink>
                </li>
              </>
            )}
            <>
              <li>
                <NavLink to={url + "settings"}>Settings</NavLink>
              </li>

              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          </ul>
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
});
