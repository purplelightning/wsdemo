import { defineStore } from "pinia";

export const createLoading: any = defineStore({
  id: "loading",
  state: () => {
    return {
      showLoading: false,
    };
  },
  actions: {
    setLoading(flag: boolean) {
      this.showLoading = flag;
    },
  },
});
