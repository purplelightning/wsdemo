import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/apiPage",
    name: "ApiPage",
    component: () => import("@/views/ApiPage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"), // 懒加载组件
  },
  {
    path: "/topic/detail/:id",
    name: "TopicDetail",
    component: () => import("@/views/home/components/TopicDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
