import { defineStore } from "pinia";

export interface infoState {
  index: number,
  totalCount: number,
  path: string,
  showLoading: boolean,
}

export const useInfoStore = defineStore({
  id: "info",
  state: (): infoState => {
    return {
      index: 0,
      totalCount: 0,
      path: '',
      showLoading: false
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
    },
    closeLoading(){
      this.showLoading = false
    },
    openLoading(){
      this.showLoading = true
    }
  }
})