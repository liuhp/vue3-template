<template>
  <el-container class="layout">
    <el-aside class="asside">
     <MenuBar></MenuBar>
    </el-aside>
    <el-container>
      <el-header class="header">
       <Header></Header>
      </el-header>
      <el-main class="main">
        main
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from './header/Header.vue';
import MenuBar from './menu/MenuBar.vue';
import Tabs from './tabs/Tabs.vue';
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .asside {
    background-color: aqua;
  }
  .header {
    background-color: aquamarine;

  }
  .main {
    background-color: aliceblue;
   
  }
}
</style>