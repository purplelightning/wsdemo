import {defineStore} from 'pinia'

export interface userState{
  name: string;
}

export const useUserStore:userState = defineStore({
  id: 'user',
  state: () => {
    return {
      name: 'pinia的name'
    }
  }
})