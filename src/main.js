import Vue from 'vue'
import App from './App'

//eslint允许new Vue而不赋值给对象
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
});
