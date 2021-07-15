import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

if(!localStorage.getItem('loginInfo')){
  localStorage.setItem('loginInfo','{}')
}

const store = new Vuex.Store({
	state:{
		token: localStorage.getItem('acToken') || '',
		id: JSON.parse(localStorage.getItem('loginInfo')).id || '',
		isLogin: Boolean(JSON.parse(localStorage.getItem('loginInfo')).isLogin),
		loginname: JSON.parse(localStorage.getItem('loginInfo')).loginname || '',
		avatarImg: JSON.parse(localStorage.getItem('loginInfo')).avatarImg || '',
		colorTheme: 'light',
		selectedTab: { name: '全部', value: 'all'},
	},
	mutations:{
		login(state, provider){
			state.isLogin = true
		},
		logout(state){
			state.isLogin = false
		},
		changeTab(state, tab){
			state.selectedTab = tab
		}
	}
})

export default store