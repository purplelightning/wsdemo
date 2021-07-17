// H5插件可用
import Vue from 'vue'
import Toast from './Toast.vue'

let instance, timer = null

const ToastMsg = (options) => {
  let ToastConstructor = Vue.extend(Toast)
  
  if(!instance){
    instance= new ToastConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
  }
  
  if(timer){
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.message = ''
  }
  if(typeof options === 'string'){
    instance.message = options
  }else{
    instance.message = options.msg
    instance.type = options.type
    instance.duration = options.duration
  }

  instance.show = true
  timer = setTimeout(()=>{
    instance.show = false
    clearTimeout(timer)
    timer = null
    instance.message = ''
  }, instance.duration || 2000)
}

ToastMsg.install = () => {
  Vue.prototype.$toast = ToastMsg
}

export default ToastMsg