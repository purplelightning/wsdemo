<template>
  <div class="list">
    <div class="item" :key="index" v-for="(item,index) in levelList">
      <div class="primary">
        <img class="user-avatar" :src="item.author && item.author.avatarImg" />
        <div class="main">
          <span class="name">{{ item.author && item.author.name}}</span>
          <span class="des">{{index+1}}楼&nbsp;{{item.createTime | sliceTime}}</span>
          <div class="content" v-html="item.content"></div>
        </div>
        <div class="fav">点赞数：{{item.ups && item.ups.length}}</div>
        <div class="icon" v-show="token&&!replyId||replyId !== item.id" @click="openReply(item.id, item.author.name)">回复</div>
        <div class="icon" v-show="token&&replyId&&replyId === item.id" @click="closeReply">收起回复</div>
      </div>
      <div class="sub-list" v-show="item.additionArr">
        <div class="primary sub-item" :key="index" v-for="(tt, index) in item.additionArr">
          <img class="user-avatar" :src="tt.author.avatarImg" />
          <div class="main">
            <span class="name">{{tt.author.name}}</span>
            <span class="des">{{tt.createTime | sliceTime}}</span>
            <div class="content" v-html="tt.content"></div>
          </div>
          <div class="fav">点赞数：{{tt.ups && tt.ups.length}}</div>
          <div class="icon" v-show="token&&!replyId||replyId !== tt.id" @click="openReply(tt.id, tt.author.name)">回复</div>
          <div class="icon" v-show="token&&replyId&&replyId === tt.id" @click="closeReply">收起回复</div>
        </div>
      </div>
    </div>
    <div class="add-reply" v-show="replyId">
      <el-input type="textarea" rows="4" v-model="replyContent"></el-input>
      <el-button type="primary" @click="addReply">回复</el-button>
    </div>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import api from '@/requests/api'

export default {
  name: 'ReplyList',
  props: ['replyList', 'topicId'],
  data(){
    return {
      replyId: '',
      replyContent: '',
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
        id: this.topicId,
        content: this.replyContent,
        author: {
          name: this.loginname,
          avatarImg: this.avatarImg
        },
        replyId: this.replyId
      }
      api.addReply(params).then( res => {
        if(res.status){
          this.$message.success('回复成功~')
          this.$emit('addReply')
          this.replyContent = ''
          this.replyId = ''
        }
      })
    },
  },
  filters:{
    sliceTime(time){
      if(time){
        return time.slice(5,14)
      }
      return ''
    }
  },
  computed:{
    ...mapState(['token', 'loginname', 'avatarImg']),
    levelList(){
      if(this.replyList){
        let arr = this.replyList.filter(v=>v.replyId === '')
        let brr = this.replyList.filter(v=>v.replyId !== '')
        for(let i of arr){
          for(let j of brr){
            if(j.replyId === i.id){
              j.getHandled = true
              if(i.additionArr){
                i.additionArr.push(j)
              }else{
                i.additionArr = []
                i.additionArr.push(j)
              }
            }
          }
        }
        arr = arr.concat(brr.filter(v=>v.getHandled === undefined))
        return arr
      }
      return []
    }
  }
}
</script>
<style scoped lang="less">
  .list{
    .item{
      width: 100%;
      padding: 10px;
      .primary{
        display: flex;
        position: relative;
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
          margin-right: 10px;
          line-height: 60px;
          cursor: pointer;
        }
      }
    }
  }
  .sub-list{
    width: calc(100% - 50px);
    padding-left: 50px;
    .sub-item{
      height: 60px !important;
      background: #f6f6f6;
      .main{
        width: 200px !important;
        .content{
          margin-top: -15px;
          width: 50%;
          height: 30px;
        }
      }
    }
  }
</style>