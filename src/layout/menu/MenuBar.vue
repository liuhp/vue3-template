<template>
  <MenuLogo class="layout-logo"></MenuLogo>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#000"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
// setup 语法糖中 定义的数据和方法,直接可以在模板中使用,无需return
import { ref, reactive, computed } from "vue"
import { useRoute } from "vue-router"
import { useMenuStore } from "@/store/menu"
import MenuItem from "./MenuItem.vue"
import MenuLogo from "./MenuLogo.vue"

let menuList = reactive([
  {
    path: "/home",
    component: "Layout",
    meta: {
      title: "概览",
      icon: "HomeFilled",
      roles: ["sys:manage"],
    },
    children: [],
  },
  {
    path: "/vm",
    component: "Layout",
    alwaysShow: true,
    name: "vm",
    meta: {
      title: "虚机管理",
      icon: "Platform",
      roles: ["sys:manage"],
      parentId: 0,
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
      parentId: 0,
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
      parentId: 0,
    },
  },
  {
    path: "/network",
    component: "Layout",
    alwaysShow: true,
    name: "network",
    meta: {
      title: "网络管理",
      icon: "Connection",
      roles: ["sys:goods"],
      parentId: 0,
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
      parentId: 0,
    },
    children: [
      {
        path: "/user/index",
        component: "/user/index.vue",
        alwaysShow: false,
        name: "userindex",
        meta: {
          title: "角色管理",
          icon: "ZoomOut",
          roles: ["sys:dept"],
          parentId: 17,
        },
      },
      {
        path: "/user/my",
        component: "/user/my.vue",
        alwaysShow: false,
        name: "my",
        meta: {
          title: "个人中心",
          icon: "ZoomOut",
          roles: ["sys:dept"],
          parentId: 17,
        },
      },
    ],
  },
])

//获得当前路由
const route = useRoute()
const activeIndex = computed(() => {
  const { path } = route
  return path
})

const menuStore = useMenuStore()
const isCollapse = computed(() => {
  return menuStore.getCollapse
})
const handleOpen = (key: string | number, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string | number, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
.layout-logo {
  animation: logoAnimation 1s ease-out;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
  background-color: #141414 !important;
}
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
  background-color: #141414 !important;
}
:deep(.el-menu .el-menu-item) {
  color: #bfcbd9;
}
:deep(.el-menu-item.is-active) {
  color: #409eff !important;
  background-color: rgba(64, 158, 255, 0.2) !important;
}

:deep(.is-opened .el-menu-item) {
  // background-color: #1f2d3d !important;
  background-color: #1a1a1a !important;
}
:deep(.el-menu-item:hover) {
  color: #409eff !important;
  // background-color: #001528 !important;
}
</style>
