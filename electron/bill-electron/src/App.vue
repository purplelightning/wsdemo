<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
  </nav>
  <router-view/>
</template>

<style lang="less">
#app {
  padding: 30px;
  height: calc(100vh - 60px);
}

a {
  padding: 10px 15px;
  margin-right: 5px;
  text-decoration: none;
  color: #222;
  border: 1px solid #ccc;
  border-radius: 5px;

  &.router-link-exact-active {
    color: #19ec5f;
  }
}
</style>
