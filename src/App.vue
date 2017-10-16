<template>
  <div>
    <v-header></v-header>
    <div class="tab border-1px topborder-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
  import header from './components/header/header'

  export default {
    components: {
      'v-header': header,//用来起别名
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    /*border-bottom:1px solid rgba(7,17,27,0.1) 为了在所有dpi不同的设备上都显示1像素*/
    border-1px(rgba(7, 17, 27, 0.1))
    topborder-1px(rgba(222, 32, 222,1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
