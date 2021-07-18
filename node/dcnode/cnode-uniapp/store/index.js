import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

if(!uni.getStorageSync('loginInfo')){
  uni.setStorageSync('loginInfo','{}')
}

const store = new Vuex.Store({
	state:{
		token: JSON.parse(uni.getStorageSync('loginInfo')).token || '',
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
		handleLogin(state, info){
			console.log(info);
			// state需要赋值，更新数据
			state.isLogin = true
			state.id = info.id
			state.loginname = info.loginname
			state.phone = info.phone
			state.avatarImg = info.avatarImg
			state.token = info.token
			uni.setStorageSync('loginInfo', JSON.stringify(info))
		},
		logout(state){
			state.isLogin = false
			state.id = ''
			state.loginname = ''
			state.phone = ''
			state.avatarImg = ''
			state.token = ''
			uni.setStorageSync('loginInfo', '{}')
		},
		setAvatar(state, url){
			state.avatarImg = url
			let info = JSON.parse(uni.getStorageSync('loginInfo'))
			info.avatarImg = url
			uni.setStorageSync('loginInfo', JSON.stringify(info))
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