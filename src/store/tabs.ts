import { defineStore } from 'pinia'
import { ITabe } from './type/index'
//定义state
export type TabsState = {
  tabList: Array<ITabe>
}

export const useTabsStore = defineStore('tabsStore', {
  state: (): TabsState => {
    return {
      tabList: []
    }
  },
  actions: {
    addTab(tab: ITabe) {
      //判断是否已经存在，如果不存在，才放入
      if (this.tabList.some(item => item.path === tab.path)) return
      this.tabList.push(tab)
    }
  },
  getters: {
    //获取tabs
    getTabs: (state: TabsState) => {
      return state.tabList
    }
  }
})
