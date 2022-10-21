import { defineStore } from "pinia"

//定义state类型
export type MenuState = {
  collapse: boolean
}

// 定义store
export const useMenuStore = defineStore("menuStore", {
  state: (): MenuState => {
    return {
      collapse: false,
    }
  },
  actions: {
    //设置collapse
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
  },
  getters: {
    getCollapse(state) {
      return state.collapse
    },
  },
})
