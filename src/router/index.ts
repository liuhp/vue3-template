import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "../layout/index.vue"

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      hidden: true,
      title: "登录",
    },
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/home",
    meta: {
      title: "概览",
      icon: "House",
      roles: [],
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "dashboard",
        meta: {
          title: "概览",
          icon: "House",
        },
      },
      {
        path: "/home/detail",
        component: () => import("@/views/home/detail.vue"),
        name: "homeDetail",
        meta: {
          title: "资源池详情",
          icon: "House",
          activeMenu: "/home",
          hidden: true, // 在左侧菜单中隐藏，默认不隐藏
        },
      },
    ],
  },
  {
    path: "/vm",
    name: "vm",
    redirect: "/vm/list",
    component: Layout,
    meta: {
      title: "虚机管理",
      icon: "Monitor",
      activeMenu: "/vm",
    },
    children: [
      {
        path: "/vm/list",
        component: () => import("@/views/vm/index.vue"),
        name: "vmList",
        meta: {
          title: "虚机管理",
          icon: "Monitor",
          activeMenu: "/vm",
        },
      },
      {
        path: "/vm/add",
        component: () => import("@/views/vm/add-case.vue"),
        name: "add-case",
        meta: {
          title: "新建实例",
          icon: "#home",
          activeMenu: "/vm",
          hidden: true, // 在左侧菜单中隐藏，默认不隐藏
        },
      },
    ],
  },
  {
    path: "/mirror",
    name: "mirror",
    component: Layout,
    meta: {
      title: "镜像管理",
      icon: "MostlyCloudy",
    },
    children: [
      {
        path: "/mirror",
        component: () => import("@/views/mirror/index.vue"),
        name: "mirror",
        meta: {
          title: "镜像管理",
          icon: "MostlyCloudy",
        },
      },
    ],
  },
  {
    path: "/spec",
    name: "spec",
    component: Layout,
    meta: {
      title: "规格管理",
      icon: "Orange",
    },
    children: [
      {
        path: "/spec",
        component: () => import("@/views/spec/index.vue"),
        name: "spec",
        meta: {
          title: "规格管理",
          icon: "Orange",
        },
      },
    ],
  },
  {
    path: "/network",
    name: "network",
    component: Layout,
    meta: {
      title: "网络管理",
      icon: "Connection",
    },
    children: [
      {
        path: "/network",
        component: () => import("@/views/network/index.vue"),
        name: "network",
        meta: {
          title: "网络管理",
          icon: "Connection",
        },
      },
    ],
  },
  {
    path: "/log",
    name: "log",
    component: Layout,
    redirect: "/log/business",
    meta: {
      title: "日志管理",
      icon: "Document",
    },
    children: [
      {
        path: "/log/business",
        component: () => import("@/views/log/business.vue"),
        name: "business",
        meta: {
          title: "业务日志",
          icon: "Tickets",
        },
      },
      {
        path: "/log/operate",
        component: () => import("@/views/log/operate.vue"),
        name: "operate",
        meta: {
          title: "操作日志",
          icon: "SetUp",
        },
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    redirect: "/user/index",
    meta: {
      title: "用户管理",
      icon: "User",
    },
    children: [
      {
        path: "/user/index",
        component: () => import("@/views/user/index.vue"),
        name: "user",
        meta: {
          title: "用户管理",
          icon: "Sugar",
        },
      },
      {
        path: "/user/my",
        component: () => import("@/views/user/my.vue"),
        name: "my",
        meta: {
          title: "个人中心",
          icon: "Lollipop",
        },
      },
    ],
  },
]
// 创建
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("token")
  // console.log('isLogin', isLogin)
  if (to.path == "/login") {
    next()
  } else {
    // 是否在登录状态下
    isLogin ? next() : next("/login")
  }
})

export default router
