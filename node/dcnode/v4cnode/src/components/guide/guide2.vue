<template>
  <div class="guide2">
    <el-button @click="add">发布订阅测试</el-button>
  </div>
</template>

<script>
import EventBus from '../../utils/EventBus'

export default {
  data() {
    return {
    }
  },
  methods:{
    add(){
      EventBus.emit('add',100)
    }
  }
}
</script>

<style scoped lang="less">
.guide2{
  float: left;
  width: 300px;
  height: 300px;
  padding-top: 50px;
}
</style>
