class EventBus {
  constructor() {
    this.events = {}
  }
  on(type, fn) {
    if (!this.events[type]) {
      this.events[type] = [fn]
    } else {
      this.events[type].push(fn)
    }
  }
  emit(type, params) {
    if (this.events[type]) {
      this.events[type].forEach(fn => {
        fn.call(this, params)
      })
    }
  }
  off(type, fn) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(v => v !== fn)
    }
  }
  once(type, fn) {
    function tmp() {
      fn(...arguments)
      this.off(type, tmp)
    }
    this.on(type, tmp)
  }
}
export default new EventBus()