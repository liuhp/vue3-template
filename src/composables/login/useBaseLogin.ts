import { reactive, ref } from "vue"
import { ElForm } from "element-plus"
import { LoginParm } from "@/api/user/UserModel"

export default function useBaseLogin() {
  //登录表单ref
  const loginFormRef = ref<InstanceType<typeof ElForm>>()
  //表单绑定的数据域
  const loginModel = reactive<LoginParm>({
    username: "",
    password: "",
    // code: "",
  })
  //表单验证规则
  const rules = reactive({
    username: [
      {
        required: true,
        trigger: "change",
        message: "请填写登录账户",
      },
    ],
    password: [
      {
        required: true,
        trigger: "change",
        message: "请填写登录密码",
      },
    ],
    // code: [
    //   {
    //     required: true,
    //     trigger: "change",
    //     message: "请填写验证码",
    //   },
    // ],
  })
  return {
    loginModel,
    rules,
    loginFormRef,
  }
}
