import { loginApi } from "@/api/user/user";
import { LoginParm, LoginResult } from "@/api/user/UserModel"; import { Result } from "@/http/request";
import { ActionContext } from "vuex";
import { RootState } from "../index";
import { setToken,setUserId,setExpireTime } from '@/utils/auth'; //定义state类型
export type UserState = {
    token:string,
    userId:string
}
//定义state
export const state : UserState = {
  token:'',
  userId:'' }
  //定义mutations
  export const mutations = {
      setToken(state:UserState,token:string){
          state.token = token;
      },
      setUserId(state:UserState,userId:string){
          state.userId = userId;
      }
  }
  //定义actios
export const actions = {
  login({commit}:ActionContext<UserState,RootState>,loginParm:LoginParm){
      return new Promise<Result>((resolve,reject)=>{
          loginApi(loginParm).then(res=>{
              if(res.data.code == 200){
//设置到vuex中 commit('setToken',res.data.token) commit('setUserId',res.data.id) //存储到sessionStorage setToken(res.data.token) setUserId(res.data.id) setExpireTime(res.data.expireTime)
}
              resolve(res)
          }).catch(error=>{
              reject(error)
}) })
  }
}

//定义getters
export const getters = {
  getToken(state:UserState){
      return state.token
} }
export default{
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
  