<template>
  <div class="collection-wrapper">
    <div class="title">我的收藏</div>
    <div class="collection">
      <topic-list :boList="state.originList" :favFlag="true"></topic-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TopicList from "@/views/home/components/TopicList.vue";
import { onMounted, reactive, Ref, ref } from "vue-demi";
import { getCollectionList } from "@/api/topic";
import { CollectionItemType } from "@/types";

const state = reactive({
  originList: [],
});

onMounted(() => {
  getCollection();
});
const getCollection = () => {
  getCollectionList().then((res) => {
    console.log(res);
    if (res.data) {
      state.originList = res.data.map((v: CollectionItemType) => {
        return {
          _id: v.collectTopicId,
          title: v.topicTitle,
          author: v.author,
        };
      });
    }
  });
};
</script>
<style lang="less" scoped>
.collection-wrapper {
  padding: 20px 50px;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .collection {
    border: 1px solid #ccc;
  }
}
</style>
