import instance from "./axios.js";
import qs from "qs";

import { LoginType } from "@/types/";

// formData格式
export function loginAPI(paramsList: any) {
  return instance({
    url: "/api/login",
    method: "post",
    data: paramsList,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: [
      (data: any) => {
        return qs.stringify(data);
      },
    ],
  });
}

export const getUserTest = () => {
  return instance({
    url: "/user/test",
    method: "get",
  });
};

export const getLogin = (params: LoginType) => {
  return instance({
    url: "/user/signin",
    method: "post",
    data: params,
  });
};

export const getRegister = (params: LoginType) => {
  return instance({
    url: "/user/signup",
    method: "post",
    data: params,
  });
};

export const uploadUserAvatar = (params: any) => {
  return instance({
    url: "/user/uploadAvatar",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
