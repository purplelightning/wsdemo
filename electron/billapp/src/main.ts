import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './samples/node-api'

import "@/assets/reset.css";

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
  // .$nextTick(() => {
  //   postMessage({ payload: 'removeLoading' }, '*')
  // })
