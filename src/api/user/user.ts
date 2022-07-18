import http from "@/http/http"
import {LoginParm, LoginResult } from './UserModel'

enum Api {
  getImg = "/api/sysUser/image",
  login = '/api/user/login'
}
//获取验证码
export async function getImageApi() {
  return await http.getImage(Api.getImg)
}

//登录
export async function loginApi(params: LoginParm) {
  return await http.login<LoginResult>(Api.login, params)
  }
