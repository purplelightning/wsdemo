<template>
  <div class="topic-list-wrapper">
    <div class="list" v-show="!favFlag && boList.length">
      <div class="item" :key="index" v-for="(item, index) in boList">
        <img class="user-avatar" :src="item.author && item.author.avatarUrl" />
        <span class="count">{{ item.replyCount }}/{{ item.visitCount }}</span>
        <div class="name">{{ item.top ? "置顶" : tabObj[item.tab] }}</div>
        <div class="title" @click="goDetail(item._id)">{{ item.title }}</div>
        <div class="last-reply" v-show="item.lastReplyAt">
          {{ item.lastReplyAt ? item.lastReplyAt.slice(5) : "" }}
        </div>
      </div>
    </div>
    <div class="list fav" v-show="favFlag && favList.length">
      <div class="item" :key="index" v-for="(item, index) in favList">
        <img class="user-avatar" :src="item.author && item.author.avatarUrl" />
        <div class="title" @click="goDetail(item._id)">{{ item.title }}</div>
      </div>
    </div>
    <div class="list no-data" v-show="!boList.length">暂无数据</div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue-demi";
import { useRouter } from "vue-router";
const props = defineProps({
  boList: Array,
  favFlag: Boolean,
});
const tabObj = {
  share: "分享",
  ask: "问答",
  good: "精华",
  job: "招聘",
  dev: "测试",
};
const favList = computed(() => props.boList);
const router = useRouter();
const goDetail = (id: string) => {
  router.push("/topic/detail/" + id);
};
</script>
<style lang="less" scoped>
.list {
  min-height: 500px;
  background: #fff;
  .item {
    position: relative;
    padding: 10px;
    width: 100%;
    height: 50px;
    line-height: 30px;
    box-sizing: border-box;
    font-size: 12px;
    border-bottom: 1px solid #ccc;
    .user-avatar {
      width: 30px;
      height: 30px;
    }
    .name {
      position: relative;
      margin-right: 4px;
      top: -10px;
      display: inline-block;
      padding: 2px 4px;
      height: 20px;
      line-height: 20px;
      background: #e5e5e5;
      color: #999;
    }
    .count {
      display: inline-block;
      vertical-align: top;
      width: 60px;
      text-align: center;
    }
    .title {
      display: inline-block;
      width: 500px;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .last-reply {
      position: absolute;
      top: 10px;
      right: 15px;
      color: #999;
    }
  }
}
.fav {
  .user-avatar {
    margin-right: 20px;
  }
}
.no-data {
  text-align: center;
  line-height: 500px;
  font-size: 22px;
  background: #eee;
}
</style>
