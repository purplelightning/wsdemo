import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		hasLogin: false,
		colorTheme: 'light',
		selectedTab: { name: '全部', value: 'all'},
		leftOpen: true,
	},
	mutations:{
		login(state, provider){
			state.hasLogin = true
		},
		logout(state){
			state.hasLogin = false
		},
		changeTab(state, tab){
			state.selectedTab = tab
		}
	}
})

export default store