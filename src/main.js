import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

import './common/stylus/index.styl'
//都是1.0的用法
Vue.use(VueRouter);
Vue.use(VueResource);

//eslint允许new Vue而不赋值给对象
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// });

//使用vue-router要改写js
let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass:'active'//配置 vue-router带来的v-link-active的别名
});

router.map({
  '/goods': {
    component: goods
  },
  '/ratings':{
    component:ratings
  },
  'seller':{
    component:seller
  }
});

router.start(app,'#app');
router.go('/goods');//默认页面
