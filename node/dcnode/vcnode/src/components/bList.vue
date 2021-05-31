<template>
  <div class="list">
    <div class="item" :key=index v-for="(item,index) in bolist">
      <img class="user-avatar" :src="item.author.avatar_url" />
      <span class="count">{{item.reply_count}}/{{item.visit_count}}</span>
      <div class="name" v-show="item.tab !== 'dev' ">{{item.top ? '置顶' : tabObj[item.tab]}}</div>
      <div class="title" @click="goDetail(item.id)">{{item.title}}</div>
      <div class="last-reply">{{item.last_reply_at | sliceTime}}</div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'bList',
  props: ['bolist'],
  data(){
    return {
      tabObj:{
        'share': '分享',
        'ask': '问答',
        'good': '精华',
        'job': '招聘',
      }
    }
  },
  methods: {
    goDetail(id){
      this.$router.history.push('/topic/detail/'+ id)
    }
  },
  filters:{
    sliceTime(time){
      return time.slice(5,10)
    }
  }
}
</script>
<style scoped lang="less">
  .list{
    .item{
      position: relative;
      padding: 10px;
      width: 100%;
      height: 50px;
      line-height: 30px;
      box-sizing: border-box;
      font-size: 12px;
      border-bottom:1px solid #ccc;
      .user-avatar{
        width: 30px;
        height: 30px;
      }
      .name{
        position: relative;
        top: -10px;
        display: inline-block;
        padding: 2px 4px;
        height: 20px;
        line-height: 20px;
        background: #e5e5e5;
        color: #999;
      }
      .count{
        display: inline-block;
        vertical-align: top;
        width: 60px;
        text-align: center;
      }
      .title{
        display: inline-block;
        width: 500px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .last-reply{
        position: absolute;
        top: 10px;
        right: 15px;
        color: #999;
      }
    }
  }
</style>