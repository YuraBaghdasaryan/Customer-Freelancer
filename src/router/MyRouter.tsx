import React from "react";
import { useRoutes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Layout } from "../pages/layout";
import { Error } from "../pages/profile/error";
import { Settings } from "../pages/profile/settings";
import { Profile } from "../pages/profile/admin/profile";
import { AllJobs } from "../pages/profile/admin/allJobs";
import { AllUser } from "../pages/profile/admin/allUser";
import { AddSkills } from "../pages/profile/admin/addSkills";
import { AddJobs } from "../pages/profile/customer/addJobs";
import { MyJob } from "../pages/profile/customer/myJobs";
import { HireFrellancer } from "../pages/HireFrellancer";
import { SeeWork } from "../pages/profile/freelancer/MyWork";
import { AllJobsFreelancer } from "../pages/profile/freelancer/AllJobsFreelancer";
import { SeeFrellancer } from "../pages/profile/freelancer/seeFrellancer";
import { SeeApplication } from "../pages/profile/customer/seeApplication";
import { Verify } from "../pages/verify";
import { ForgotPassword } from "../pages/forgotPassword";
import { ResetPassword } from "../pages/resetPassword";



export const MyRouter: React.FC = React.memo(() => {
  const userId = 123; 

  const router = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/verify", element: <Verify /> },
    { path: "/forgotPassword", element: <ForgotPassword /> },
    { path: "/resetPassword/:email", element: <ResetPassword /> },
    {
      path: "/:name",
      element: <Layout />,
      children: [
        { path: "profile", element: <Profile /> },
        { path: "allJobs", element: <AllJobs /> },
        { path: "allUser", element: <AllUser /> },
        { path: "addSkills", element: <AddSkills /> },
        { path: "settings", element: <Settings /> }, 
        { path: "addJobs", element: <AddJobs /> },
        { path: "myJobs", element: <MyJob /> },
        { path: "HireFreelancer", element: <HireFrellancer /> },
        { path: "MyWork", element: <SeeWork /> },
        { path: "AllJobsFrellancer", element: <AllJobsFreelancer /> },
        { path: "seeFrellancer/:id", element: <SeeFrellancer /> },
        { path: "seeApplication/:id", element: <SeeApplication /> }
      ],
    },
    { path: "*", element: <Error /> },
  ]);

  return router;
});
