import { ITabe } from '../type/index'
//定义state
export type TabsState = {
    tabList: Array<ITabe>
}
export const state: TabsState = {
    tabList: []
}
//定义mutations
export const mutations = {
    addTab: (state: TabsState, tab: ITabe) => {
        //判断是否已经存在，如果不存在，才放入
        if (state.tabList.some(item => item.path === tab.path)) return;
        state.tabList.push(tab);
    }
}

//定义actios
export const actions = {}

//定义getters
export const getters = {
    //获取tabs
    getTabs: (state: TabsState) => {
        return state.tabList;
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
