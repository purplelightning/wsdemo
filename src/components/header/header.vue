<template>
  <div class="header">
    <div class="content-wrapper">

      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar">
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <!--<div class="totalsupport">-->
        <!--{{seller.supports.length}}个 >-->
      <!--</div>-->
      </div>


    </div>
    <div class="bulletin-wrapper">
      <span class="icon"></span>
      <span class="btext">{{seller.bulletin}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      this.classMap=['decrease','discount','special','invoice','guarantee'];
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    color: #fff
    background: rgb(0,0,0,0.2)

    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size:0//把图片与content中的空白字符去掉,设置父元素字体大小
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius:2px

      .content
        margin-left:16px
        display: inline-block
        font-size:16px
        .title
          margin:2px 0 8px 0
          .brand
            display: inline-block
            vertical-align top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size:30px 18px
            background-repeat:no-repeat
          .name
            margin-left:6px
            font-size:16px
            font-weight:bold
            line-height:18px

        .description
          margin-bottom:10px
          font-size: 12px
          line-height:12px

        .support
          .icon
            display: inline-block
            vertical-align:top
            width:12px
            height: 12px
            margin-right:4px
            background-size:12px 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            vertical-align:top
            line-height: 12px
            font-size: 10px



</style>
