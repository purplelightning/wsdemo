<template>
  <div class="list">
    <div class="item" :key="index" v-for="(item,index) in replyList">
      <img class="user-avatar" :src="item.author.avatar_url" />
      <div class="main">
        <span class="name">{{item.author.loginname}}</span>
        <span class="des">{{index+1}}楼&nbsp;{{item.create_at | sliceTime}}</span>
        <div class="content" v-html="item.content"></div>
      </div>
      <div class="fav">点赞数：{{item.ups && item.ups.length}}</div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'ReplyList',
  props: ['replyList'],
  data(){
    return {
    }
  },
  methods: {
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
      display: flex;
      position: relative;
      padding: 10px;
      width: 100%;
      height: 80px;
      line-height: 30px;
      box-sizing: border-box;
      font-size: 12px;
      border-bottom:1px solid #ccc;
      .user-avatar{
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        position: relative;
        top: 10px;
      }
      .main{
        display: inline-block;
        flex: 1;
        width: 300px;
        padding-left: 10px;
        .name{
          width: 100px;
          color: #666;

        }
        .des{
          color: #515df2;
        }
      }
      .fav{
        flex: 0 0 80px;
        line-height: 60px;
      }
    }
  }
</style>