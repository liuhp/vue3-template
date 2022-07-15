<template>
  <MenuLogo v-if="!isCollapse"></MenuLogo>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#304156"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script  lang="ts" setup>
// setup 语法糖中 定义的数据和方法,直接可以在模板中使用,无需return
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router';
import {useStore} from '@/store/index'
import MenuItem from './MenuItem.vue';
import MenuLogo from './MenuLogo.vue'
let menuList = reactive([
  {
    path: "/home",
    component: "Layout",
    meta: {
      title: "概览",
      icon: "House",
      roles: ["sys:manage"]
    },
    children: []
  },
  {
    path: "/vm",
    component: "Layout",
    alwaysShow: true,
    name: "vm",
    meta: {
      title: "虚机管理",
      icon: "Monitor",
      roles: ["sys:manage"],
      parentId: 0
    },
  },
  {
    path: "/mirror",
    component: "Layout",
    alwaysShow: true,
    name: "mirror",
    meta: {
      title: "镜像管理",
      icon: "MostlyCloudy",
      roles: ["sys:goods"],
      parentId: 0
    },

  },
  {
    path: "/spec",
    component: "Layout",
    alwaysShow: true,
    name: "spec",
    meta: {
      title: "规格管理",
      icon: "Orange",
      roles: ["sys:goods"],
      parentId: 0
    },

  },
  {
    path: "/network",
    component: "Layout",
    alwaysShow: true,
    name: "network",
    meta: {
      title: "网络管理",
      icon: "ZoomOut",
      roles: ["sys:goods"],
      parentId: 0
    },

  },
  {
    path: "/user",
    component: "Layout",
    alwaysShow: true,
    name: "user",
    meta: {
      title: "用户管理",
      icon: "User",
      roles: ["sys:goods"],
      parentId: 0
    },

  }
])

//获得当前路由
const route = useRoute()
const activeIndex = computed(()=>{
  const {path} = route
  return path
})

const store = useStore()
const isCollapse = computed(()=>{
  return store.getters['getCollapse']
})
const handleOpen = (key: string | number, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string | number, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu{
  border-right: none;
}
:deep(.el-sub-menu .el-sub-menu__title){
  color: #f4f4f5 !important;
}
:deep(.el-menu .el-menu-item){
  color: #bfcbd9;
}
:deep(.el-menu-item.is-active){
  color: #409eff !important;
}
:deep(.is-opened .el-menu-item){
  background-color: #1f2d3d !important;
}
:deep(.el-menu-item:hover){
  background-color: #001528 !important;
}

</style>