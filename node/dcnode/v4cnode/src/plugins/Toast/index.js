import Vue from 'vue'
import Toast from './Toast.vue'

const ToastMsg = (options) => {
  let ToastConstructor = Vue.extend(Toast)

  let instance, timer = null
  if(!instance){
    instance= new ToastConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
  }
  if(typeof options === 'string'){
    instance.message = options
  }else{
    instance.message = options.msg
    instance.type = options.type
    instance.duration = options.duration
  }
  
  if(timer){
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.message = ''
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