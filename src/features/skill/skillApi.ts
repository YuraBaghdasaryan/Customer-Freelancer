import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";
import Cookies from "js-cookie";

export const addSkillsByIdThunk = createAsyncThunk(
  "add/skill",
  async (obj: any) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.post(
      "/skills",
      obj,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  }
);

export const getSkillsThunk = createAsyncThunk("get/skills", async () => {
  const token = Cookies.get("access_token");
  const { data } = await myAxios.get("/skills", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const getSkillsByIdThunk = createAsyncThunk(
  "get/skills by id",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.get("/skills/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);
export const deleteSkillsByIdThunk = createAsyncThunk(
  "delete/skills",
  async (id: number) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.delete("/skills/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  }
);

export const patchSkillsByIdThunk = createAsyncThunk(
  "patch/skill",
  async ({id, obj}:{id:number, obj:{name:string}}) => {
    const token = Cookies.get("access_token");
    const { data } = await myAxios.patch(
      "/skills/" + id,
      obj,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  }
);

export const FindJobSkillByIdThunk = createAsyncThunk(
  "find/skillJobById",
  async (id: number) => {
    const token =Cookies.get("access_token");
    const { data } = await myAxios.get(
      "/skills/findJobBySkillId/"
      + id,{
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    return data;
  }
);
