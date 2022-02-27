import { defineStore } from "pinia";
import { LoginParamType } from "@/types";

export interface userState {
  id: string;
  token: string;
  loginName: string;
  avatarImg: string;
  isLogin: boolean;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): userState => {
    return {
      id: "",
      token: "",
      loginName: "",
      avatarImg: "",
      isLogin: false,
    };
  },
  getters: {},
  actions: {
    doLogin(params: LoginParamType) {
      this.token = params.token;
      this.id = params.id;
      this.loginName = params.loginName;
      this.avatarImg = params.avatarImg;
      this.isLogin = true;
    },
    doLoginout() {
      this.token = "";
      this.id = "";
      this.loginName = "";
      this.avatarImg = "";
      this.isLogin = false;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
  },
});
