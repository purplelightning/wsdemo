// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import { baseUrl } from './common/api'

import axios from 'axios'
axios.defaults.baseURL = baseUrl
Vue.prototype.$http = axios


axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response.data
}, err => {
  return err
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
