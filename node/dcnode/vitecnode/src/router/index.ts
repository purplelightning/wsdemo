import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ApiPage from '@/views/ApiPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/apiPage',
    name: 'ApiPage',
    component: ApiPage
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue') // 懒加载组件
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
