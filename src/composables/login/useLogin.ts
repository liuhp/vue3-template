import { getCurrentInstance } from "vue"
import { loginApi } from "@/api/user/user"
import { LoginParm } from "@/api/user/UserModel"
export default function useLogin(loginModel: LoginParm) {
  const { proxy } = getCurrentInstance() as any
  //登录提交
  const login = () => {
    proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
      console.log(valid)
      if (valid) {
        await loginApi(loginModel).then((res) => {
          if (res.code == 200) {
            console.log(res)
          }
        })
      }
    })
  }
  return {
    login,
  }
}
