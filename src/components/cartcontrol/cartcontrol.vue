<!--商品增加,减少组件-->
<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0"
         @click="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click="addCart($event)">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object,
        count: 0
      }
    },
    created() {
//      console.log(this.food);
    },
    methods: {
      addCart(event) {//因为用了better-scroll,所以这里的click不能用,要在goods中把click置为true
        if (!event._constructed) {
          return;//不是自己派发的,就return
        }
//        console.log(this.food.count);
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);//给food增加count属性,同时设为1
        } else {
          this.food.count++;
        }
        this.$dispatch('cart.add',event.target);//传递dom元素给父组件goods
        this.$on('cart.add',function () {
//          console.log('aaaa');
        })
      },
      decreaseCart() {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }

      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3D(0, 0, 0)
        .inner
          display: inline-block
          font-size: 24px
          line-height: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3D(24px, 0, 0)
        .inner
          transform:rotate(180deg)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      height: 24px
      color: rgb(147, 153, 159)

    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
</style>
