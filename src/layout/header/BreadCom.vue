<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch, Ref } from "vue"
import { RouteLocationMatched, useRoute } from "vue-router"
// 定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([])

const route = useRoute()
const getBreadCom = () => {
  let mached = route.matched.filter((item) => item.meta && item.meta.title)
  //判断两个菜单是否重复,重复的话去掉最后一个
  if (mached.length === 2) {
    const first = mached[0]
    const sencond = mached[1]
    if (first.meta.title === sencond.meta.title) {
      mached.pop()
    }
  }
  tabs.value = mached
}
getBreadCom()
// 监听路由发生变化,重新获取面包屑导航数据
watch(
  () => route.path,
  () => getBreadCom()
)
</script>

<style lang="scss" scoped>
:deep(.el-breadcrumb__inner) {
  color: rgb(244, 244, 245) !important;
}
</style>
