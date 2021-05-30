import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/container/Home'
import Guide from '@/container/Guide'
import Apipage from '@/container/Apipage'
import About from '@/container/About'
import Bdetail from '@/components/detail/Bdetail'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      exact: true,
      component: Home
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/apipage',
      name: 'Apipage',
      component: Apipage
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/topic/detail/:id',
      name: 'Bdetail',
      component: Bdetail
    },
  ]
})
