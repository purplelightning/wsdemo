// H5插件可用
import Vue from 'vue'
import Loading from './Eloading.vue'

let instance, timer = null

const LoadingMsg = (options) => {
  let LoadingConstructor = Vue.extend(Loading)
  
  if(!instance){
    instance= new LoadingConstructor()
		instance.vm = instance.$mount()
  }
  instance.type = options
  instance.show = true
}

LoadingMsg.close = () =>{
	instance.show = false
	instance.type = ''
}

LoadingMsg.install = () => {
  Vue.prototype.$loading = LoadingMsg
}

export default LoadingMsg