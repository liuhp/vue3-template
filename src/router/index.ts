import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from '../layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: ()=> import('@/views/login/index.vue'),
    name: 'login'
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect:'/home',
    children:[
      {
        path:'/home',
        component: () => import('@/views/home/index.vue'),
        name:'dashboard',
        meta:{
          title:'概览',
          icon:'#home'
        }

      },
    ]
  },
  {
    path: '/vm',
    name: 'vm',
    component: Layout,
    children:[
      {
        path:'/vm',
        component: () => import('@/views/vm/index.vue'),
        name:'vm',
        meta:{
          title:'虚机管理',
          icon:'#home'
        }

      },
    ]
  },
  {
    path: '/mirror',
    name: 'mirror',
    component: Layout,
    children:[
      {
        path:'/mirror',
        component: () => import('@/views/mirror/index.vue'),
        name:'mirror',
        meta:{
          title:'镜像管理',
          icon:'#home'
        }

      },
    ]
  },
  {
    path: '/spec',
    name: 'spec',
    component: Layout,
    children:[
      {
        path:'/spec',
        component: () => import('@/views/spec/index.vue'),
        name:'spec',
        meta:{
          title:'规格管理',
          icon:'#home'
        }
      },
    ]
  },
  {
    path: '/network',
    name: 'network',
    component: Layout,
    children:[
      {
        path:'/network',
        component: () => import('@/views/network/index.vue'),
        name:'network',
        meta:{
          title:'网络管理',
          icon:'#home'
        }

      },
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: "/user/index",
    meta:{
      title:'用户管理',
      icon:'#home'
    },
    children:[
      {
        path:'/user/index',
        component: () => import('@/views/user/index.vue'),
        name:'user',
        meta:{
          title:'角色管理',
          icon:'#home'
        },
      },
      {
        path:'/user/my',
        component: () => import('@/views/user/my.vue'),
        name:'my',
        meta:{
          title:'个人中心',
          icon:'#home'
        }

      },
    ]
  },
  
]
// 创建
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router