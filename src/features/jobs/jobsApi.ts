import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";
import Cookies from "js-cookie";
import { create } from "domain";

export const addJobsByIdThunk = createAsyncThunk(
  "add/jobs",
  async (obj: any) => {
    const token = Cookies.get("access_token");
    console.log(obj);

    const { data } = await myAxios.post("/jobs", obj, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const getJobsThunk = createAsyncThunk("get/jobs", async () => {
  const token = Cookies.get("access_token");
  const { data } = await myAxios.get("/jobs", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const getJobsByIdThunk = createAsyncThunk(
  "get/jobs by id",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("/jobs/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const deleteJobsByIdThunk = createAsyncThunk(
  "delete/jobs user",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.delete("/jobs/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const patchJobsByIdThunk = createAsyncThunk(
  "patch/jobs",
  async ({
    id,
    obj,
  }: {
    id: number;
    obj: { description: string; title: string };
  }) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.patch("/jobs/" + id, obj, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const getFreelancerByIdThunk = createAsyncThunk(
  "getFreelancerById",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("/freelancer/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const findJobsByStatus = createAsyncThunk(
  "find/job/status",
  async (status: string) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("/jobs/findJobsByStatus" + status, {
      headers: {
        Authorization: "Bearer" + token,
      },
    });
    return data;
  }
);
export const findJobFrellancerIdThunk = createAsyncThunk(
  "find/job/frellancer",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("/jobs/findJobsByFreelancerId/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("=>", data);
    
    return data;
  }
);

export const findJobsByFreeLancerGetRateFeedBackThunk = createAsyncThunk(
  "find/job/rate/fedback",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get(
      "/findJobsByFreelancerId/getRate/getFeedback" + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  }
);

export const findJobsByCustomerIdThunk = createAsyncThunk(
  "find/job/customer",
  async ({ id, status }: { id: number; status: any }) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get(
      `/jobs/findJobsByCustomerId/${id}?status=${status}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("===>", data, status);

    return data;
  }
);

export const jobsUpdateThunk = createAsyncThunk(
  "update/jobs",
  async ({ id, obj }: { id: number; obj: any }) =>  {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.patch(
      "/jobs/updateJobStatus/" + id,
      obj,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data, id, obj);
    
    return data;
  }
);

export const jobsSaveFrellancer = createAsyncThunk(
  "jobs/save/freelancer",
  async ({ jobId, freelancerId }: { jobId: number; freelancerId: number }) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.patch(
      `/jobs/saveFreelancer/${jobId}/${freelancerId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  }
);

export const findCustomerDataByTokenJobsThunk = createAsyncThunk(
  "get/customer by token jobs",
  async () => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("customer/find", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("=>", data);

    return data.jobs;
  }
);

///
export const JobSkillThunk = createAsyncThunk("JobsSkills", async () => {
  const token = Cookies.get("access_token");
  const { data } = await myAxios.post("/job-skill", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const DeleteJobsSkillThunk = createAsyncThunk(
  "DeleteJobSkills",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.delete("/job-skill" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);
///

export const createJobsUserThunk = createAsyncThunk("JobsUser", async (obj:any) => {
  const token = Cookies.get("access_token");
  console.log(token, obj);
  
  const { data } = await myAxios.post("/job-user",obj, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});


////
export const JobsUserFindByJobIdThunk = createAsyncThunk(
  "JobsUserFindById",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get(`/job-user/findByJobId/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const JobsUserFindByUserIdThunk = createAsyncThunk(
  "JobsUserFindByUserId",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get(`/job-user/findByUserId/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const DeleteJobUserIdThunk = createAsyncThunk(
  "DeleteJobUser",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.delete("/job-user/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

///


export const FeedBackJobIdThunk = createAsyncThunk(
  "feedbackJob",
  async ({id, obj}:{id: number, obj:any}) => {
    const token = Cookies.get("access_token");
    
    const { data } = await myAxios.post("/feedback/" + id, obj, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(id, obj, data);
    return data;
  }
);
