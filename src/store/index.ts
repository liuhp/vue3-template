// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  collapse: boolean,

}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    collapse: false
  },
  mutations: {
    setCollapse(state: State, collapse: boolean){
      state.collapse = collapse
    }
  },
  getters: {
    getCollapse(state: State){
      return state.collapse
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}