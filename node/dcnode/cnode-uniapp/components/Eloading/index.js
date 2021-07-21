// H5插件可用
import Vue from 'vue'
import Eloading from './Eloading.vue'
let LoadingConstructor = Vue.extend(Eloading)
let instance

const LoadingMsg = (options) => {
  
  if(!instance){
    instance= new LoadingConstructor()
		instance.vm = instance.$mount()
		document.body.appendChild(instance.vm.$el)
  }
  instance.type = options
  instance.show = true
	console.log(instance);
}

LoadingMsg.close = () =>{
	instance.show = false
	instance.type = ''
}

//暴露方法
LoadingMsg.install = () => {
  Vue.prototype.$loading = LoadingMsg
}

export default LoadingMsg