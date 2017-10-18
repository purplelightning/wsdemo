<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">
          ¥ 0
        </div>
        <div class="desc">

        </div>
      </div>
      <div class="content-right">
        <div class="low">
          ¥20起送
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        background: #141d27
        .logo-wrapper
          display: inline-block
          position: relative
          vertical-align: top
          top: -10px
          padding: 6px
          margin: 0 12px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
        .price
          display: inline-block
        .desc
          display: inline-block
      .content-right
        flex: 0 0 105px
        width: 105px
        background: #a0f033


</style>
