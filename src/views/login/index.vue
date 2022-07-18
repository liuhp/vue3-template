<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginModel"
      :rules="rules"
      :inline="false">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon><UserFilled /></el-icon>
        </span>
        <el-input
          ref="username"
          v-model="loginModel.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item>
         <span class="svg-container">
          <el-icon><Unlock /></el-icon>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginModel.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <component class="icons" :is="passwordType === 'password' ? 'Hide' : 'View'" />
        </span>
      </el-form-item>
      <el-row style="width: 100%;">
          <el-col :span="16">
            <el-form-item>
              <span class="svg-container">
                <el-icon><Key /></el-icon>
              </span>
                <el-input
                  placeholder="请输入验证码"
                  v-model="loginModel.code"
                ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="image-wrapper" :span="8">
            <img :src='imgSrc' @click="getImage" />
          </el-col>
        </el-row>
      <el-form-item>
        <el-button class="mybtn" type="primary" size="default"
          @click.native.prevent="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import useImage from '@/composables/login/useImage';

//验证码
const {imgSrc,getImage} = useImage();
const loginModel = reactive({
  username: "",
  password: "",
  code: "",
  
})
const passwordType = ref('password') 
const rules = reactive([])
const showPwd = () => {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
}

const handleLogin = () => {

}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__wrapper{
      width: 100%;
      border: none;
      background-color: transparent;
      box-shadow: none;
      padding: 0;
    }
    .el-input__wrapper:hover{
      box-shadow: none;
    }
    :deep(el-form-item:hover){
      box-shadow: 0 0 0 1pxvar(--el-input-border-color,var(--el-border-color)) inset;
      border: #eee;
    }

    input {
      background: transparent;
      border: none;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 440px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }


  .svg-container {
    padding: 2px 0 6px 15px;
    font-size: 16px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
    .el-icon{
      vertical-align: middle;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    .icons{
      width: 16px;
      height: 16px;
      color: $dark_gray;
    }
  }
  .image-wrapper{
    display: flex;
    justify-content: end;
    align-items: center;
    height: 48px;
  }

  .mybtn {
    width: 100%;
    height: 48px;
    font-size: 18px;
  }
}
</style>
