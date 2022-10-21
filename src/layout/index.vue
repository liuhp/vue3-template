<template>
  <el-container class="layout">
    <el-aside width="auto" class="asside">
      <MenuBar></MenuBar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <Tabs></Tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from "./header/Header.vue"
import MenuBar from "./menu/MenuBar.vue"
import Tabs from "./tabs/Tabs.vue"
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .asside {
    // background-color: rgb(48, 65, 86);
    background: #141414;
    border-right: 1px solid #4c4d4f;
  }
  .header {
    height: 50px;
    border-bottom: 1px solid #4c4d4f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: #212938;
    background: #000;
  }
  .main {
    padding-top: 0;
    // background-color: darkgray;
    .main-content {
      padding: 20px 0;
    }
  }
}
</style>
