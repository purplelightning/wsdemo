<template>
  <div class="goods">
    <!--左侧菜单栏-->
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item"
            :class="{'current':currentIndex===$index}" @click="selectMenu($index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon"
                  :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!--右侧具体商品-->
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul class="licon">
            <li @click="setSelectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" v-bind:src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="des">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率: {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥ {{food.price}}</span><span v-show="food.oldPrice"
                                                                 class="old">¥ {{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!--将food传入cartcontrol组件-->
                  <cartcontrol v-bind:food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div class="shop">
    <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
  </div>

  <!--调用子组件方法-->
  <food :food="selectFood" v-ref:food></food>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../../components/shopcart/shopcart'
  import cartcontrol from '../../components/cartcontrol/cartcontrol'
  import food from '../../components/food/food'


  const ERR_OK = 0;

  export default {
    data() {
      return {
        goods: [],
        listHeight: [],//记录区间高度的数组
        scrollY: 0,
        selectFood: {},

      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true//滑动的preventDefault阻止的点击事件,默认派发
        });

        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          click: true,
          probeType: 3//探针,监听位置
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;//开始是0
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;//区间累加高度
          this.listHeight.push(height);
        }
      },
      selectMenu: function (index, event) {
        if (!event._constructed) {
          return;//pc端点击事件不执行,不让pc端的派发执行
        }
//        console.log(index);
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _drop(target) {
        this.$refs.shopcart.drop(target);//再把target传给shopcart
      },
      setSelectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectFood = food;
        this.$refs.food.show();
      },

    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          //落在区间i和区间i+1之间
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('api/goods').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });

        }
      })
    },
    components: {
      shopcart,
      cartcontrol,
      food,
    },
    events: {
      //接收cartcontrol传递的target
      'cart-add'(target) {
        this._drop(target);//把target传给_drop方法
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        padding: 12px
        width: 56px
        height: 54px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          font-weight: 700
          color: #000
          background: #ffffff
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          vertical-align: middle
          width: 56px
          font-size: 12px
          border-1px(rgba(7, 17, 27.0 .1))

    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)
        border-left: 2px solid #d9dde1
        background: #f3f5f7;
      .licon
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27.0 .1))
          &:last-child
            border-none()
            margin-bottom: 0

          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            vertical-align: top
            margin-top: 2px
            .name
              margin-bottom: 8px
              height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
              line-height: 14px
            .des
              margin-bottom: 8px
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
            .extra
              line-height: 10px
              color: rgb(147, 153, 159)
              font-size: 10px
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px


</style>
