import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../components/CheckBill.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
