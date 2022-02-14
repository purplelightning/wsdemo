import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

if(!localStorage.getItem('loginInfo')){
  localStorage.setItem('loginInfo','{}')
}

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('acToken') || '',
    id: JSON.parse(localStorage.getItem('loginInfo')).id || '',
    isLogin: Boolean(JSON.parse(localStorage.getItem('loginInfo')).isLogin),
    loginname: JSON.parse(localStorage.getItem('loginInfo')).loginname || '',
    avatarImg: JSON.parse(localStorage.getItem('loginInfo')).avatarImg || '',
    LOADING: false,
    ANIMATION: false
  },
  mutations: {
    doLogin (state, params) {
      let token = params.token
      state.token = token
      state.id = params.id
      state.loginname = params.username
      state.avatarImg = params.avatarImg
      state.isLogin = true
      params.isLogin = true
      params.loginname = params.username
      delete params.username
      delete params.token
      localStorage.setItem('loginInfo', JSON.stringify(params))
      localStorage.setItem('acToken', token)
      
    },
    doLogout (state) {
      localStorage.setItem('loginInfo', '{}')
      localStorage.setItem('acToken','')
      state.token = ''
      state.id = ''
      state.loginname= ''
      state.avatarImg = ''
      state.isLogin = false
    },
    setAvatar(state, url){
      const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
      console.log(url)
      state.avatarImg = url
      loginInfo.avatarImg = url
      localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
    },
    showLoading (state) {
      state.LOADING = true
    },
    hideLoading (state) {
      state.LOADING = false
    },
    showAnimation(state){
      state.ANIMATION=true
    },
    hideAnimation (state) {
      state.ANIMATION = false
    },
  },
  actions: {},
  modules: {},
});
