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
      <div class="icon" v-show="token&&!replyId" @click="openReply(item.id, item.author.loginname)">回复</div>
      <div class="icon" v-show="token&&replyId&&replyId === item.id" @click="closeReply">收起回复</div>
    </div>
    <div class="add-reply" v-show="replyId">
      <el-input type="textarea" rows="4" v-model="replyContent"></el-input>
      <el-button type="primary" @click="addReply">回复</el-button>
    </div>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import urlObj from '../../common/api'

export default {
  name: 'ReplyList',
  props: ['replyList', 'topicId'],
  data(){
    return {
      replyId: '',
      replyContent: ''
    }
  },
  methods: {
    openReply(id, name){
      this.replyId = id
      this.replyContent = '@' + name + ' '
    },
    closeReply(){
      this.replyId = ''
      this.replyContent = ''
    },
    addReply(){
      const params ={
        accesstoken: this.token,
        content: this.replyContent,
        reply_id: this.replyId
      }
      this.$http.post(urlObj.addReply(this.topicId), params).then( res => {
        if(res.success){
          this.$message.success('回复成功~')
          this.$emit('addReply')
          this.replyContent = ''
          this.replyId = ''
        }
      })
    }
  },
  filters:{
    sliceTime(time){
      return time.slice(5,10)
    }
  },
  computed:{
    ...mapState(['token'])
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
      .icon{
        display: inline-block;
        cursor: pointer;
      }
    }
  }
</style>