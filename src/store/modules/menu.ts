import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/Index.vue'
const modules = import.meta.glob('../../views/**/*.vue')
//定义state
export type MenuState = {
    collapse: boolean,
}
export const state: MenuState = {
    collapse: false,
}
//定义mutations
export const mutations = {
    //设置collapse
    setCollapse: (state: MenuState, collapse: boolean) => {
        state.collapse = collapse;
    },
}
//定义actions
export const actions = {
}
//定义getters
export const getters = {
    //获取collapse
    getCollapse: (state: MenuState) => {
        return state.collapse;
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}