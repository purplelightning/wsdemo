<template>
  <div class="toast-wrapper" :class="[type+ '-toast']" v-show="show">
    <div class="content">{{message}}</div>
  </div>
</template>

<script>
export default {
  props:{
    message:{
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      duration: 3000
    }
  },
  data() {
    return {
      show: false
    }
  },
}
</script>

<style scoped lang="less">
.toast-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
}
.content{
  position: absolute;
  top: 20%;
  left: 50%;
  text-align: center;
  line-height: 50px;
  transform: translateX(-50%);
  width: 300px;
  height: 50px;
  border-radius: 5px;
  
}
.success-toast{
  .content{
    border: 1px solid #99bb99;
    background: #bbffbb;
    color: green;
  }
}
.error-toast{
  .content{
    border: 1px solid #bb9999;
    background: #ffbbbb;
    color: red;
  }
}
.info-toast{
  .content{
    border: 1px solid #9999bb;
    background: #bbbbff;
    color: blue;
  }
}
</style>
