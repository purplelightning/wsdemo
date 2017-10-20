<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="nowprice">¥ {{food.price}}</span><span class="oldprice" v-show="food.oldPrice">¥ {{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click="addFirst" class="buy" v-show="!food.count || food.count===0">
          加入购物车
        </div>
      </div>

      <split v-show="food.info"></split>

      <div class="info" v-show="food.info">
        <div class="title">商品介绍</div>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <!--<div class="comment">-->
      <!--<div class="name">商品评价</div>-->
      <!--<div class="category">-->
      <!--<div class="all">全部</div>-->
      <!--<div class="tui">推荐</div>-->
      <!--<div class="to">吐槽</div>-->
      <!--</div>-->
      <!--</div>-->

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from '../../components/cartcontrol/cartcontrol'
  import split from '../../components/split/split'

  export default {
    data() {
      return {
        showFlag: false,
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      }
    },
    computed: {
      tuiCount() {
        let count1 = 0;
        this.food.ratings.forEach((rate) => {
          if (rate.rateType == 0) {
            count1++;
          }
        });
        return count1;
      },
      toCount() {
        let count2 = 0;
        this.food.ratings.forEach((rate) => {
          if (rate.rateType == 1) {
            count2++;
          }
        });
        return count2;
      }
    },
    components: {
      cartcontrol,
      split,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-transition
      opacity: 1
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      opacity: 0
      transition: all 0.2s linear
      transform: translate3d(100%, 0, 0)
    .food-content
      font-size: 20px
      .image-header
        position: relative
        height: 0
        width: 100%
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: white
      .content
        padding: 18px
        position: relative
        .title
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: 14px
          font-size: 14px
          margin-bottom: 8px
        .detail
          line-height: 10px
          height: 10px
          font-size: 0
          margin-bottom: 18px
          color: rgb(147, 153, 159)
          .sell-count
            display: inline-block
            font-size: 10px
            margin-right: 12px
          .rating
            display: inline-block
            font-size: 10px
        .price
          line-height: 24px
          font-weight: 700
          .nowprice
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .oldprice
            font-size: 10px
            color: rgb(147, 153, 159)
            text-decoration: line-through
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: white
          background: rgb(0, 160, 220)


      .info
        padding: 18px
        .title
          color: rgb(7, 17, 27)
          line-height: 14px
          font-size: 14px
          margin-bottom: 6px
        .text
          margin: 0 8px
          color: rgb(77, 85, 93)
          line-height: 24px
          font-size: 12px
        .comment
          padding: 18px
          .name
            display: block
            color: rgb(7, 17, 27)
            line-height: 14px
            font-size: 14px
            margin-bottom: 6px
          .category
            margin-top: 18px
            .all, .tui, .to
              display: inline-block
              font-size: 12px
              line-height: 16px
              border-radius: 2px
              padding: 8px
            .all
              color: white
              background: rgb(0, 160, 220)
            .tui
              color: rgb(77, 85, 93)
              background: rgba(0, 160, 220, .2)
            .to
              color: rgba(77, 85, 93, 0.2)
              background: rgba(0, 160, 220, .1)

</style>














