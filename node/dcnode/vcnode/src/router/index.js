import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/container/Home'
import Guide from '@/container/Guide'
import Apipage from '@/container/Apipage'
import About from '@/container/About'
import TopicDetail from '@/components/detail/TopicDetail'
import ManageTopic from '@/components/detail/ManageTopic'
import Collection from '@/container/Collection'

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
      path: '/collection',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/topic/detail/:id',
      name: 'TopicDetail',
      component: TopicDetail
    },
    {
      path: '/topic/manage',
      name: 'ManageTopic',
      component: ManageTopic
    }
  ]
})
