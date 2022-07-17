// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import ITAB from './type/index'

export interface State {
  collapse: boolean,
  tabList: Array<ITAB>,

}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    collapse: false,
    tabList: [],
  },
  mutations: {
    setCollapse(state: State, collapse: boolean){
      state.collapse = collapse
    },
    addTab(state: State, tab: ITAB ){
      if(state.tabList.some(item => item.path === tab.path)) return
      state.tabList.push(tab)
    },
  },
  getters: {
    getCollapse(state: State){
      return state.collapse
    },
    //获取tabs
    getTabs: (state: State) => {
      return state.tabList;
  }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}