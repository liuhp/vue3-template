import { defineStore } from "pinia"
// import { loginApi } from "@/api/user/user"
import { LoginParm } from "@/api/user/UserModel"
// import { Result } from "@/http/request"
import { setToken } from "@/utils/auth"

export type UserState = {
  token: string
  userId: string
}
export const useUserStore = defineStore("userStore", {
  state: (): UserState => {
    return {
      token: "",
      userId: "",
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserId(userId: string) {
      this.userId = userId
    },
    login(loginParm: LoginParm) {
      return new Promise((resolve, reject) => {
        setToken("token")
        resolve({
          data: {
            code: 200,
          },
        })
        // loginApi(loginParm)
        //   .then((res) => {
        //     if (res.data.code == 200) {
        //       //存储到sessionStorage setToken(res.data.token) setUserId(res.data.id) setExpireTime(res.data.expireTime)
        //     }
        //     resolve(res)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
  },
  getters: {
    getToken(state: UserState) {
      return state.token
    },
  },
})
