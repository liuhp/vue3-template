import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from '../layout/index.vue'

const routes: Array<RouteRecordRaw> = [
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
      {
        path:'/vm',
        component: () => import('@/views/vm/index.vue'),
        name:'vm',
        meta:{
          title:'虚机管理',
          icon:'#home'
        }

      },
      {
        path:'/mirror',
        component: () => import('@/views/mirror/index.vue'),
        name:'mirror',
        meta:{
          title:'镜像管理',
          icon:'#home'
        }

      },
      {
        path:'/spec',
        component: () => import('@/views/spec/index.vue'),
        name:'spec',
        meta:{
          title:'规格管理',
          icon:'#home'
        }

      },
      {
        path:'/network',
        component: () => import('@/views/network/index.vue'),
        name:'network',
        meta:{
          title:'网络管理',
          icon:'#home'
        }
      },
      {
        path:'/user',
        // component: () => import('@/views/user/index.vue'),
        name:'user',
        meta:{
          title:'用户管理',
          icon:'#home'
        },
        children:[
          {
            path:'/user-manage',
            component: () => import('@/views/user/index.vue'),
            name:'network',
            meta:{
              title:'网络管理',
              icon:'#home'
            }
    
          },
        ],
      },
    ]
  }
  
]
// 创建
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router