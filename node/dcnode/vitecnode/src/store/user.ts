import { defineStore } from "pinia";
import { LoginParamType } from "@/types";

export interface userState {
  name: string;
}

export const useUserStore: any = defineStore({
  id: "user",
  state: () => {
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
});
