import myAxios from "./axios.js";
import qs from "qs";

export const getUserTest = () => {
  return myAxios(
    {
      url: "/user/test",
      method: "get",
    },
    { repeatRequestCancel: false }
  );
};

// formData格式
export function loginAPI(paramsList: any) {
  return myAxios({
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
