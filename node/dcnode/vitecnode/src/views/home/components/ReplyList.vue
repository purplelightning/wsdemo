<template>
  <div class="reply-list">
    <div class="item" :key="index" v-for="(item, index) in levelList">
      <div class="primary">
        <img class="user-avatar" :src="item.author && item.author.avatarImg" />
        <div class="main">
          <span class="name">{{ item.author && item.author.name }}</span>
          <span class="des"
            >{{ index + 1 }}楼&nbsp;{{
              item.createTime ? item.createTime.slice(5) : ""
            }}</span
          >
          <div class="content" v-html="item.content"></div>
        </div>
        <div class="fav">
          <el-icon><CaretTop /></el-icon>{{ item.ups && item.ups.length }}
        </div>
        <el-icon><Comment /></el-icon>
        <i
          class="el-icon-chat-dot-round icon"
          v-show="
            (userStore.token && !state.replyId) || state.replyId !== item.id
          "
          @click="openReply(item.id, item.author.name)"
        ></i>
        <div
          class="icon"
          v-show="userStore.token && state.replyId && state.replyId === item.id"
          @click="closeReply"
        >
          收起回复
        </div>
      </div>
      <div class="sub-list" v-show="item.additionArr">
        <div
          class="primary sub-item"
          :key="index"
          v-for="(tt, index) in item.additionArr"
        >
          <img class="user-avatar" :src="tt.author.avatarImg" />
          <div class="main">
            <span class="name">{{ tt.author.name }}</span>
            <span class="des">{{
              tt.createTime ? tt.createTime.slice(5) : ""
            }}</span>
            <div class="content" v-html="tt.content"></div>
          </div>
          <div class="fav">
            <el-icon><CaretTop /></el-icon>{{ item.ups && item.ups.length }}
          </div>
          <el-icon><Comment /></el-icon>
          <i
            class="el-icon-chat-dot-round icon"
            v-show="
              (userStore.token && !state.replyId) || state.replyId !== tt.id
            "
            @click="openReply(tt.id, tt.author.name)"
          ></i>
          <div
            class="icon"
            v-show="userStore.token && state.replyId && state.replyId === tt.id"
            @click="closeReply"
          >
            收起回复
          </div>
        </div>
      </div>
    </div>
    <div class="add-reply" v-show="state.replyId">
      <el-input
        type="textarea"
        rows="4"
        v-model="state.replyContent"
      ></el-input>
      <el-button type="primary" @click="addReplyFunc">回复</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue-demi";
import { useUserStore } from "@/store/user";
import { addReply } from "@/api/topic";
import { tip } from "@/utils";
import { Comment, CaretTop } from "@element-plus/icons";

const userStore = useUserStore();

const props = defineProps({
  replyList: Array,
  topicId: String,
});

const state = reactive({
  replyId: "",
  replyContent: "",
});
const openReply = (id: string, name: string) => {
  state.replyId = id;
  state.replyContent = `@${name}  `;
};
const closeReply = () => {
  state.replyId = "";
  state.replyContent = "";
};

const levelList = computed(() => {
  if (props.replyList) {
    let arr = props.replyList.filter((v: any) => v.replyId === "");
    let brr = props.replyList.filter((v: any) => v.replyId !== "");
    for (let i of arr) {
      for (let j of brr) {
        if (j.replyId === i.id) {
          j.getHandled = true;
          if (i.additionArr) {
            i.additionArr.push(j);
          } else {
            i.additionArr = [];
            i.additionArr.push(j);
          }
        }
      }
    }
    arr = arr.concat(brr.filter((v) => v.getHandled === undefined));
    return arr;
  }
  return [];
});

const addReplyFunc = () => {
  const params = {
    id: props.topicId || "",
    content: state.replyContent,
    replyId: state.replyId,
    author: {
      name: userStore.loginName,
      avatarImg: userStore.avatarImg,
    },
  };
  addReply(params).then((res) => {
    console.log(res);
    if (res.status) {
      tip("回复成功~");
      // TODO
      // this.$emit("addReply");
      state.replyContent = "";
      state.replyId = "";
    }
  });
};
</script>
<style lang="less" scoped>
.reply-list {
  .item {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    .primary {
      display: flex;
      position: relative;
      height: 60px;
      line-height: 30px;
      box-sizing: border-box;
      font-size: 12px;
      border-top: 1px solid #ccc;
      .user-avatar {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        position: relative;
        top: 10px;
      }
      .main {
        display: inline-block;
        flex: 1;
        width: 300px;
        padding-left: 10px;
        .name {
          margin-right: 3px;
          width: 100px;
          color: #666;
        }
        .des {
          color: #515df2;
        }
      }
      .fav {
        flex: 0 0 40px;
        line-height: 60px;
        i {
          margin-right: 5px;
        }
      }
      .icon {
        display: inline-block;
        margin-right: 10px;
        line-height: 60px;
        cursor: pointer;
      }
    }
  }
}
.sub-list {
  width: calc(100% - 30px);
  padding-left: 30px;
  .sub-item {
    margin-bottom: 2px;
    height: 50px !important;
    background: #fafafa;
    border: none !important;
    .user-avatar {
      flex: 0 0 30px !important;
      width: 30px !important;
      height: 30px !important;
    }
    .main {
      width: 200px !important;
      .content {
        margin-top: -15px;
        width: 50%;
        height: 30px;
      }
    }
  }
}
.add-reply {
  padding: 10px 15px;
  button {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
