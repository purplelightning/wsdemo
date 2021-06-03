<template>
  <div class="detail-wrapper">
    <div class="edit" @click="editTopic">编辑</div>
    <div class="detail">
      <div class="title">{{info.title}}</div>
      <div class="des">
        发布于&nbsp;{{info.create_at | sliceTime}}&nbsp;&nbsp;&nbsp;作者&nbsp;{{info.author && info.author.loginname}}&nbsp;&nbsp;&nbsp;
        {{info.visit_count}}&nbsp;次浏览
      </div>
      <div v-html="info.content"></div>
    </div>
    <div class="reply">
      <div class="reply-head">{{info.reply_count}}回复</div>
      <reply-list :topicId="info.id" :replyList="info.replies"
      @addReply="getDetailInfo"></reply-list>
      <div class="add-reply" v-show="token">
        <el-input type="textarea" rows="4" v-model="replyContent"></el-input>
        <el-button type="primary" @click="addReply">回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ReplyList from './ReplyList'
import urlObj from "../../common/api";

import {mapState} from 'vuex'

export default {
  name: "TopicDetail",
  data() {
    return {
      info: {},
      replyContent: ''
    };
  },
  mounted() {
    this.getDetailInfo();
  },
  methods: {
    getDetailInfo() {
      if (!this.$route.params.id) {
        return;
      }
      const params = {
        id: this.$route.params.id,
      };
      this.$http.get(urlObj.getTopicDetail(params)).then((res) => {
        if (res.data) {
          this.info = res.data;
        }
      });
    },
    addReply(){
      const params ={
        accesstoken: this.token,
        content: this.replyContent,
      }
      this.$http.post(urlObj.addReply(this.info.id), params).then( res => {
        if(res.success){
          this.$message.success('回复成功~')
          this.getDetailInfo()
          this.replyContent = ''
        }
      })
    },
    editTopic(){
      const params = {
        type: 'edit',
        ftitle: this.info.title,
        fcontent: this.info.content,
        topicId: this.info.id
      }
      this.$router.history.push({name: 'ManageTopic', params})
    }
  },
  computed: {
    ...mapState(['token'])
  },
  components: {
    ReplyList
  },
  filters:{
    sliceTime(time){
      if(time){
        return time.slice(5,10)
      }
      return ''
    }
  }
};
</script>

<style scoped lang="less">
.detail-wrapper {
  position: relative;
  .edit{
    position: absolute;
    top: 10px;
    right: 100px;
    cursor: pointer;
  }
  .detail{
    margin: 20px 30px 0 30px;
    padding: 0 15px;
    min-width: 660px;
    width: 90%;
    background: #fff;
    box-sizing: border-box;
    .title{
      font-size:22px;
      font-weight: 700;
    }
    .des{
      padding: 10px 0;
      font-size: 12px;
      color: #838383;
      border-bottom: 1px solid #ccc;
    }
  }
  .reply{
    margin: 15px 30px;
    width: 90%;
    height: 300px;
    background: #fff;
    box-sizing: border-box;
    .reply-head{
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #f6f6f6;
    }
    .add-reply{
      .el-textarea{
        margin-bottom: 20px;
      }
    }
  }
}
</style>
