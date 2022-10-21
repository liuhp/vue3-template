<template>
  <MenuLogo class="layout-logo"></MenuLogo>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#000"
    router
  >
    <MenuItem :menuList="state.menus"></MenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
// setup 语法糖中 定义的数据和方法,直接可以在模板中使用,无需return
import { reactive, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useMenuStore } from "@/store/menu"
import { routes } from "@/router/index"
import MenuItem from "./MenuItem.vue"
import MenuLogo from "./MenuLogo.vue"

const state = reactive({
  menus: [] as any[],
})
onMounted(() => {
  state.menus = handleRoutes(routes)
})

//获得当前路由
const route = useRoute()
const activeIndex = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const menuStore = useMenuStore()
const isCollapse = computed(() => {
  return menuStore.getCollapse
})

const setObjProperties = (target: object, source: any) => {
  Object.entries(source).forEach(([key, value]) => {
    if (value || typeof value !== "undefined") {
      target[key] = value
    }
  })
}

// 处理路由
const handleRoutes = (routes: Array<any>) => {
  // 递归处理路由
  const routers = []
  for (let i = 0; i < routes.length; i++) {
    const { redirect, path, meta, children = [] } = routes[i]
    const hidden = meta?.hidden ? meta.hidden : false
    if (hidden) {
      continue
    } // 隐藏的菜单
    // copy route
    const metaCopy = { ...meta }
    const router = { path, meta: metaCopy, children }
    // 复制属性
    setObjProperties(router, {
      redirect,
    })
    // todo 权限判断

    // 子菜单
    const subChildren = children.filter((item: any) => !item.meta?.hidden)
    // todo: showByOneChildren用于拓展，是否只展示一个子菜单
    // const showByOneChildren = meta?.showByOneChildren?  meta?.showByOneChildren: false
    if (subChildren && subChildren.length) {
      if (subChildren.length === 1) {
        metaCopy.type = "menu" // 没有子菜单
      } else {
        metaCopy.type = "submenu" // 下面还能展开菜单
      }
      router.children = handleRoutes(subChildren)
    } else {
      metaCopy.type = "menu"
    }
    routers.push(router)
  }
  return routers
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
  width: 200px;
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
:deep(.is-opened .el-menu-item) {
  // background-color: #1f2d3d !important;
  background-color: #1a1a1a !important;
}
:deep(.el-menu-item.is-active) {
  color: #409eff !important;
  background-color: rgba(64, 158, 255, 0.2) !important;
}

:deep(.el-menu-item:hover) {
  color: #409eff !important;
  // background-color: #001528 !important;
}
</style>
