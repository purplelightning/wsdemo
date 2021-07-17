<template>
  <view class="toast-wrapper" :class="[toastType+ '_toast']" v-show="Boolean(toastMsg)">
    <view class="content">{{toastMsg}}</view>
  </view>
</template>

<script>
	import { mapState } from 'vuex'
	
export default {
  data() {
    return {
      show: false
    }
  },
	computed:{
		...mapState(['toastMsg', 'toastType'])
	}
}
</script>

<style scoped lang="less">
.toast-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
	z-index: 150;
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
._toast,.success_toast{
  .content{
    border: 1px solid #99bb99;
    background: #bbffbb;
    color: green;
  }
}
.error_toast{
  .content{
    border: 1px solid #bb9999;
    background: #ffbbbb;
    color: red;
  }
}
.info_toast{
  .content{
    border: 1px solid #9999bb;
    background: #bbbbff;
    color: blue;
  }
}
</style>
