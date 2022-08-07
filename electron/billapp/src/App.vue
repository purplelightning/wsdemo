<template>
  <nav>
    <router-link class="router-btn" to="/">首页</router-link>
    <router-link class="router-btn" to="/about">校验</router-link>
  </nav>
  <router-view/>
</template>

<style lang="less">
#app {
  padding: 30px;
  // background: linear-gradient(to bottom right, #c165dd, #5c27fe);
}

.router-btn{
  margin-right: 10px;
  padding: 8px 14px;
}

a {
  padding: 10px 15px;
  margin-right: 5px;
  text-decoration: none;
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: @linear-bg;

  &.router-link-exact-active {
    color: #fff;
  }
}
</style>
