import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import router from "../router";

export const tip = (msg: string, msgType?: any) => {
  const type = msgType ? msgType : "success";
  return ElMessage({
    message: msg,
    type: type,
  });
};

export const toLogin = () => {
  router.replace({
    path: "/login",
  });
};
