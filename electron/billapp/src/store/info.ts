import { defineStore } from "pinia";

export interface infoState {
  index: number,
  totalCount: number,
  path: string,
}

export const useInfoStore = defineStore({
  id: "info",
  state: (): infoState => {
    return {
      index: 0,
      totalCount: 0,
      path: ''
    }
  },
  actions: {
    changeIndex(index: number){
      this.index = index
    },
    changeTotalCount(num: number) {
      this.totalCount = num
    },
    setPath(url: string) {
      this.path = url
    }
  }
})