<template>
  <div class="detail-wrapper">
    <div class="btns">
      <el-button
        v-show="!state.info.isCollected && userStore.token"
        type="primary"
        size="mini"
        @click="handleFav()"
        >收藏</el-button
      >
      <el-button
        v-show="state.info.isCollected && userStore.token"
        type="info"
        size="mini"
        @click="handleFav()"
        >取消收藏</el-button
      >
      <el-button
        type="success"
        size="mini"
        v-show="
          state.info.author && state.info.author.name === userStore.loginName
        "
        @click="editTopic"
        >编辑</el-button
      >
      <el-button
        type="danger"
        size="mini"
        v-show="
          state.info.author && state.info.author.name === userStore.loginName
        "
        @click="deleteTopic"
        >删除</el-button
      >
    </div>
    <div class="detail">
      <div class="title">{{ state.info.title }}</div>
      <div class="des">
        发布于&nbsp;{{
          state.info.createTime ? state.info.createTime.slice(5) : ""
        }}&nbsp;&nbsp;&nbsp;作者&nbsp;{{
          state.info.author && state.info.author.name
        }}&nbsp;&nbsp;&nbsp; {{ state.info.visitCount }}&nbsp;次浏览
      </div>
      <div class="content" v-html="state.info.content"></div>
    </div>
    <div class="reply">
      <div class="reply-head">{{ state.info.replyCount }}回复</div>
      <reply-list
        v-show="state.info.replyList"
        :topicId="state.info._id"
        :replyList="state.info.replyList"
        @addReply="getDetailInfo"
      ></reply-list>
      <div class="add-reply" v-show="userStore.token">
        <el-input
          type="textarea"
          rows="4"
          v-model="state.replyContent"
        ></el-input>
        <el-button type="primary" @click="addReplyFunc">回复</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="TopicDetail">
import { onMounted, reactive } from "vue-demi";
import { useRoute } from "vue-router";
import ReplyList from "./ReplyList.vue";
import { addReply, getTopicDetail } from "@/api/topic";
import { useUserStore } from "@/store/user";
import { tip } from "@/utils";
import { TopicIdType } from "@/types";

const state = reactive({
  info: {},
  replyContent: "",
});

const route = useRoute();
const userStore = useUserStore();

const getDetailInfo = () => {
  if (!route.params.id) {
    return;
  }
  const id = typeof route.params.id === "string" ? route.params.id : "";
  const params = {
    id: id,
  };
  getTopicDetail(params).then((res) => {
    if (res.data) {
      state.info = res.data;
    }
  });
};
const addReplyFunc = () => {
  if (!state.replyContent) {
    tip("回复内容不能为空", "error");
    return;
  }
  const params = {
    id: state.info._id,
    content: state.replyContent,
    author: {
      name: userStore.loginname,
      avatarImg: userStore.avatarImg,
    },
  };
  addReply(params).then((res) => {
    if (res.status) {
      tip("回复成功~");
      getDetailInfo();
      state.replyContent = "";
    }
  });
};

onMounted(() => {
  getDetailInfo();
});
</script>
<style lang="less" scoped>
.detail-wrapper {
  position: relative;
  .btns {
    float: right;
    margin-right: 50px;
    .el-button {
      cursor: pointer;
    }
  }
  .detail {
    margin: 20px 30px 0 30px;
    min-width: 660px;
    width: 90%;
    background: #fff;
    box-sizing: border-box;
    .title {
      font-size: 22px;
      font-weight: 700;
    }
    .des {
      padding: 10px 0;
      font-size: 12px;
      color: #838383;
      border-bottom: 1px solid #ccc;
    }
    .content {
      padding: 10px 0;
      min-height: 80px;
    }
  }
  .reply {
    margin: 15px 30px;
    width: 90%;
    height: 300px;
    background: #fff;
    box-sizing: border-box;
    .reply-head {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #f6f6f6;
    }
    .add-reply {
      height: 200px;
      .el-textarea {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
