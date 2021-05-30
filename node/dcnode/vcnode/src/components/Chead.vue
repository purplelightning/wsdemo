<template>
  <div id="head-wrapper">
    <div class="left">
      <router-link to="/">CNODE社区</router-link>
      <div class="search"></div>
    </div>
    <div class="right">
      <router-link class="item" to="guide">新手入门</router-link>
      <router-link class="item" to="apipage">API</router-link>
      <router-link class="item" to="about">关于</router-link>
      <div class="item">注册</div>
      <div class="item">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
#head-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 60px;
  min-width: 550px;
  background: #444;
  text-decoration: none;
  .left{
    margin-left: 60px;
    a{
      color: #ccc;
      text-decoration: none;
    }
  }
  .right{
    position: absolute;
    height: 60px;
    top: 0;
    right: 60px;
    .item{
      display: inline-block;
      margin-right: 20px;
      line-height: 60px;
      height: 100%;
      color: #ccc;
      text-decoration: none;
      text-align: center;
    }
  }
}
</style>
