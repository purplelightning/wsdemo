import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/views/Home'
import Guide from '@/views/Guide'
import Apipage from '@/views/ApiPage'
import TopicDetail from '@/components/detail/TopicDetail'
import ManageTopic from '@/components/detail/ManageTopic'
import Collection from '@/views/Collection'

import Login from '@/views/Login'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/tool",
    name: "Tool",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "tool" */ "../views/Tool.vue"),
  },
  {
    path: "/spider",
    name: "SpiderPage",
    component: () =>
      import(/* webpackChunkName: "tool" */ "../views/SpiderPage.vue"),
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
];

const router = new VueRouter({
  routes,
});

export default router;
