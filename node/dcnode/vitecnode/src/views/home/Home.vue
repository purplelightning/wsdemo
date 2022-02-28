<template>
  <div id="home">
    <div class="left"></div>
    <article>
      <div class="tab-container">
        <div
          :key="index"
          class="tab"
          :class="{ active: index === state.selectIndex }"
          v-for="(item, index) in state.tabs"
          @click="changeList(index)"
        >
          {{ item.name }}
          <div class="highlight"></div>
        </div>
      </div>
      <topic-list :boList="state.list"></topic-list>
      <el-pagination
        :background="true"
        layout="prev, pager, next, sizes, jumper"
        :page-sizes="[10, 15, 20, 30]"
        :current-page="state.pageIndex"
        :page-size="state.pageSize"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :total="50"
      >
      </el-pagination>
    </article>
    <div class="right"></div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, Ref, ref } from "vue";
import TopicList from "./components/TopicList.vue";
import { TopicType } from "@/types";
import { getTopicList } from "@/api/topic";

const state = reactive({
  selectIndex: 5,
  tabs: [
    { name: "全部", value: "all" },
    { name: "精华", value: "good" },
    { name: "分享", value: "share" },
    { name: "问答", value: "ask" },
    { name: "招聘", value: "job" },
    { name: "客户端测试", value: "dev" },
  ],
  list: [],
  pageSize: 10,
  pageIndex: 1,
});
const tab: Ref<string> = computed(() => state.tabs[state.selectIndex].value);

const changeList = (index: number) => {
  state.selectIndex = index;
  state.pageIndex = 1;
  getData();
};

const handlePageChange = (pageIndex: number) => {
  state.pageIndex = pageIndex;
  getData();
};

const handleSizeChange = (pageSize: number) => {
  state.pageSize = pageSize;
  state.pageIndex = 1;
  getData();
};

const getData = (): void => {
  const params = {
    tab: tab.value,
    page: state.pageIndex,
    pageSize: state.pageSize,
  };
  getTopicList(params).then((res) => {
    state.list = res.data;
  });
};

onMounted(() => {
  state.selectIndex = 5;
  getData();
});
</script>
<style lang="less">
#home {
  display: flex;
  width: 100%;
  min-width: 560px;
  .left,
  .right {
    flex: 0 0 100px;
    min-height: 500px;
  }
  article {
    margin-top: 15px;
    flex: 1;
    border: 1px solid #ccc;
    .tab-container {
      display: flex;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #f6f6f6;
      .tab {
        position: relative;
        flex: 1;
        padding: 0 4px;
        line-height: 50px;
        color: #80bd01;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
        .highlight {
          display: none;
        }
      }
      .active {
        font-size: 1.2em;
        color: #fff;
        background: #80bd01;
        .highlight {
          display: inline-block;
          position: relative;
          top: -36px;
          width: 80%;
          height: 2px;
          background: #fff;
        }
      }
    }
  }
}
.el-pagination {
  padding-top: 10px;
  padding-bottom: 10px;
  background: #fff;
  .el-pagination__sizes {
    margin-left: 20px;
  }
}
</style>
