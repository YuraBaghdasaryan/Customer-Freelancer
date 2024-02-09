import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";
import { RegisterUser, User } from "../../type";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk("user/login", async (obj: any) => {
  const token = Cookies.get("access_token");
  const { data } = await myAxios.post("/auth/login/", obj);
  return data;
});

export const registerUser = createAsyncThunk(
  "post/register",
  async (obj: any) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.post("register", obj);
    return data;
  }
);
export const profileUser = createAsyncThunk("post/profile", async () => {
  const token = Cookies.get("access_token");
  const { data } = await myAxios.get("profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data.user;
});

export const getUsers = createAsyncThunk("get/users", async () => {
  const token = Cookies.get("access_token");
  const { data } = await myAxios.get("user", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const findCustomerThunk = createAsyncThunk("get/customer", async () => {
  const token = Cookies.get("access_token");
  const { data } = await myAxios.get("customer", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});
export const findCustomerDataByTokenThunk = createAsyncThunk(
  "get/customer by token",
  async () => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("customer/find", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const getFreelancerThunk = createAsyncThunk(
  "getFrellancer",
  async () => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("/freelancer", {
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

export const UbdateFreelanceerByIdThunk = createAsyncThunk(
  "UbdateFrellancer",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.patch("/freelancer" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const FindFrellancerBySkillandSalaryThunk = createAsyncThunk(
  "FindFrellancerSkill&Salary",
  async ({
    skill,
    max,
    min,
  }: {
    skill?: string;
    max?: number;
    min?: number;
  }) => {
    const token = Cookies.get("access_token");
    let str = skill ? "skills=" + skill + "&" : "";
    str += min ? "min-salary=" + min + "&" : "";
    str += max ? "max-salary=" + max : "";

    str = str.endsWith("&") ? str.slice(0, -1) : str;
    console.log(str);

    const { data } = await myAxios.get(
      `/freelancer/find/freelancerBySkillAndSalary${str ? "?" + str : ""}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  }
);

export const userChangePasswordThunk = createAsyncThunk(
  "change Password",
  async (obj: any) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.patch("/user/us/changepassword", obj, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);
export const userChangeNameSurnameThunk = createAsyncThunk(
  "change name surname",
  async ({ id, obj }: { id: number; obj: any }) => {
    console.log(id);

    const token = Cookies.get("access_token");
    const { data } = await myAxios.patch("/user/" + id, obj, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const deleteUserThunk = createAsyncThunk(
  "delete user",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.delete("/user/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

///patch i posti depqum 3 obj petqa partatdir headers lini


export const isverify = createAsyncThunk(
  "get/usersisverify",
  async (obj: any) => {
    console.log(obj);
    const { data } = await myAxios.post("user/verify", obj);
    return data;
  }
);





export const userForgotPassword = createAsyncThunk(
  "forgot password",
  async (obj: { email: string }) => {
    const { data } = await myAxios.patch("/user/us/forgotPassword", obj);
    return data;
  }
);

export const userResetPassword = createAsyncThunk(
  "reset password",
  async ({
    email,
    obj,
  }: {
    email: string;
    obj: { code: number; password: string; confirm_password: string };
  }) => {
    const { data } = await myAxios.patch(
      "/user/us/resetPassword/" + email,
      obj
    );
    return data;
  }
);
