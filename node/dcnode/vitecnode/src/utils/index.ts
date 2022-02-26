import { ElMessage } from "element-plus";

export const tip = (msg: string, msgType: any) => {
  const type = msgType ? msgType : "success";
  return ElMessage({
    message: msg,
    type: type,
  });
};
