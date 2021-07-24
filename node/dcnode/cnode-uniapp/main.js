import Vue from 'vue'
import App from './App'
import store from './store'

import Json from './Json' //测试用数据

Vue.config.productionTip = false


// 小程序，APP不支持，用于H5
// import Toast from 'components/Toast'
// Vue.use(Toast)
// import Eloading from 'components/Eloading'
// Vue.use(Eloading)


import ToastMP from 'components/ToastMP/ToastMP.vue'
Vue.component('ToastMP', ToastMP)

function toast(option){
	store.commit('setToast', option)
	setTimeout(()=>{
		store.commit('setToast', 'close')
	},1500)
}
Vue.prototype.$toast = toast

import EloadingMP from 'components/EloadingMP/EloadingMP.vue'
Vue.component('EloadingMP', EloadingMP)

function loading(flag){
	if(flag){
		store.commit('openLoading')
	}else{
		setTimeout(()=>{
			store.commit('closeLoading')
		}, 1000)
	}
}

const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

Vue.prototype.$loading = loading

Vue.prototype.$api = { json }

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
