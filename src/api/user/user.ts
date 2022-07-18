import http from "@/http/http"

enum Api {
  getImg = "/api/sysUser/image",
}
//获取验证码
export async function getImageApi() {
  return await http.getImage(Api.getImg)
}
