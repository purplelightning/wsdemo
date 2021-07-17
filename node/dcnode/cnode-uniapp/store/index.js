import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

if(!uni.getStorageSync('loginInfo')){
  uni.setStorageSync('loginInfo','{}')
}

const store = new Vuex.Store({
	state:{
		token: uni.getStorageSync('acToken') || '',
		id: JSON.parse(uni.getStorageSync('loginInfo')).id || '',
		isLogin: Boolean(JSON.parse(uni.getStorageSync('loginInfo')).isLogin),
		loginname: JSON.parse(uni.getStorageSync('loginInfo')).loginname || '',
		avatarImg: JSON.parse(uni.getStorageSync('loginInfo')).avatarImg || '',
		colorTheme: 'light',
		selectedTab: { name: '全部', value: 'all'},
		showLoading: false,
		loadingType: '',
		toastMsg: '',
		toastType:''
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
		},
		openLoading(state){
			state.showLoading = true
		},
		closeLoading(state){
			state.showLoading = false
		},
		setToast(state, option){
			if(option === 'close'){
				state.toastMsg = ''
				state.toastType = ''
			}else if(typeof option === 'string'){
				state.toastMsg = option
			}else{
				state.toastMsg = option.msg
				state.toastType = option.type
			}
		}
	}
})

export default store