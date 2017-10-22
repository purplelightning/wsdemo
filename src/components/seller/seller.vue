<template>
  <div class="seller" v-el:seller>
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{seller.name}}</div>
        <div class="score-wrapper border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="rating-count">({{seller.ratingCount}})</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
      </div>

      <ul class="detail">
        <li class="minprice-wrapper">
          <div class="title">起送价</div>
          <div class="min-price">{{seller.minPrice}}<span class="sm">元</span></div>
        </li>
        <li class="method">
          <div class="title">商家配送</div>
          <div class="deliveryfee">{{seller.deliveryPrice}}<span class="sm">元</span></div>
        </li>
        <li class="time">
          <div class="title">平均配送时间</div>
          <div class="deliverytime">{{seller.deliveryTime}}<span class="sm">分钟</span></div>
        </li>
      </ul>
      <split></split>

      <div class="bulletin">
        <div class="title">公告与活动</div>
        <p class="content border-1px">{{seller.bulletin}}</p>

        <ul v-if="seller.supports" class="support-content">
          <li v-for="support in seller.supports" class="support-item border-1px">
            <div class="icon" :class="classMap[support.type]"></div>
            <div class="text">{{support.description}}</div>
          </li>
        </ul>

      </div>
      <split></split>

      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" v-el:pic-wrapper>
          <ul class="pic-list" v-el:pic-list>
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>

      <div class="info-wrapper">
        <div class="title">商家信息</div>
        <ul class="content">
          <li v-for="info in infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star'
  import split from '../../components/split/split'
  import BScroll from 'better-scroll'

  const ERR_OK = 0;

  export default {
    data() {
      return {}
    },
    props: {
      seller: {
        type: Object,
      }
    },
    components: {
      star,
      split,
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.seller, {
            click: true,
          })
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;//ul宽度
          this.$els.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$els.picWrapper, {
                scrollX: true,
                eventPassThrough: 'vertical'
              });
            }else{
              this.picScroll.refresh();
            }
          })
        }
      }
    },
    //观测更新
    watch: {
      'seller'() {
        this._initScroll();
        this._initPics();
      }
    },
    ready() {//执行时机优先于watch的执行时机
      this._initScroll();
      this._initPics();
      //设置内层的宽度超过外层的宽度
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;//ul宽度
        this.$els.picList.style.width = width + 'px';
        this.$nextTick(() => {
          this.picScroll = new BScroll(this.$els.picWrapper, {
            scrollX: true,
            eventPassThrough: 'vertical'
          });
        })
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute //使用better-scroll还要绝对定位,定高
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
        padding: 18px
        .title
          margin-bottom: 8px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .score-wrapper
          padding-bottom: 18px
          line-height: 18px
          font-size: 0
          border-1px: rgba(7, 17, 27, 0.1)
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .rating-count
            display: inline-block
            vertical-align: top
            margin-right: 12px
            font-size: 10px
            color: rgb(77, 85, 93)
          .sell-count
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(77, 85, 93)

      .detail
        display: flex
        padding: 18px
        .minprice-wrapper
          display: inline-block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.2)
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .min-price
            font-size: 24px
            color: rgb(7, 17, 27)
            line-height: 24px
            .sm
              font-size: 10px
        .method
          display: inline-block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .deliveryfee
            font-size: 24px
            color: rgb(7, 17, 27)
            line-height: 24px
            .sm
              font-size: 10px
        .time
          display: inline-block
          flex: 1
          text-align: center
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .deliverytime
            font-size: 24px
            color: rgb(7, 17, 27)
            line-height: 24px
            .sm
              font-size: 10px

      .bulletin
        padding: 18px 18px
        .title
          margin-bottom: 8px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .content
          padding: 8px 12px 16px 12px
          font-size: 12px
          color: rgb(240, 20, 20)
          line-height: 24px
          border-1px: rgba(7, 17, 27, 0.2)
        .support-content
          .support-item
            padding: 16px 12px
            font-size: 0
            border-1px: rgba(7, 17, 27, 0.2)
            &:last-child
              border-none()
            .icon
              display: inline-block
              vertical-align: top
              width: 16px
              height: 16px
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_4')
              &.discount
                bg-image('discount_4')
              &.guarantee
                bg-image('guarantee_4')
              &.invoice
                bg-image('invoice_4')
              &.special
                bg-image('special_4')
            .text
              display: inline-block
              vertical-align: top
              color: rgb(7, 17, 27)
              line-height: 16px
              font-size: 12px

      .pics
        padding: 18px
        .title
          margin-bottom: 12px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .pic-wrapper /*横向滚动*/
          width: 100%
          overflow: hidden
          white-space: nowrap /*不会折行*/
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 6px
              height: 90px
              width: 120px
              &:last-child
                margin-right: 0

</style>







