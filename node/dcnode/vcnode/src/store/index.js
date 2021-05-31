import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

if(!localStorage.getItem('loginInfo')){
  localStorage.setItem('loginInfo','{}')
}

const state = {
  token: JSON.parse(localStorage.getItem('acToken')) || '',
  id: JSON.parse(localStorage.getItem('loginInfo')).id || '',
  isLogin: Boolean(JSON.parse(localStorage.getItem('loginInfo')).isLogin),
  loginname: JSON.parse(localStorage.getItem('loginInfo')).loginname || '',
  avatarImg: JSON.parse(localStorage.getItem('loginInfo')).avatarImg || '',
}

const mutations = {
  doLogin (state, params) {
    state.token = params.token
    state.id = params.id
    state.loginname = params.loginname
    state.avatarImg = params.avatarImg
    state.isLogin = true
    params.isLogin = true
    delete params.token
    localStorage.setItem('loginInfo', JSON.stringify(params))
    localStorage.setItem('acToken', JSON.stringify(token))
  }
}

export default new Vuex.Store({
  state,
  mutations
})