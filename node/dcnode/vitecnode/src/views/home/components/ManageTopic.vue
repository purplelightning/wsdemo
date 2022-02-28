<template>
  <div class="manage-topic">
    <h3>{{ type === "add" ? "添加话题" : "编辑话题" }}</h3>
    <el-form ref="form" :model="state">
      <el-form-item label="标题">
        <el-input v-model="state.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :rows="5" v-model="state.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="doSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue-demi";
import { useRouter } from "vue-router";
import { addTopic, updateTopic } from "@/api/topic";
import { tip } from "@/utils";
import { useUserStore } from "@/store/user";
import { UpdateTopicType } from "@/types";

const router = reactive(useRouter());
const type = computed(() => {
  return router.currentRoute?.params?.type;
});

const state = reactive({
  title: router.currentRoute?.params?.ftitle || "",
  content: router.currentRoute?.params?.fcontent || "",
  topicId: router.currentRoute?.params?.topicId || "",
});

const userStore = useUserStore();

const doSubmit = () => {
  if (!state.title || !state.content) {
    tip("请输入标题或内容", "info");
    return;
  }
  const params = {
    title: state.title,
    tab: "dev",
    content: state.content,
    author: userStore.loginName,
    avatarImg: userStore.avatarImg,
  };
  if (!state.topicId) {
    addTopic(params).then((res: any) => {
      if (res.status) {
        tip("话题添加成功");
        state.title = "";
        state.content = "";
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 1000);
      } else {
        tip(res.msg, "error");
      }
    });
  } else {
    const upParam = {
      id: state.topicId,
      title: state.title,
      tab: "dev",
      content: state.content,
    };
    updateTopic(upParam).then((res) => {
      if (res.status) {
        tip("话题修改成功");
        state.title = "";
        state.content = "";
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 1000);
      } else {
        tip("话题修改失败", "error");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.manage-topic {
  padding: 30px;
  h3 {
    text-align: center;
  }
  .el-form {
    position: relative;
    margin: 20px auto 0 auto;
    padding: 30px;
    width: 500px;
    height: 500px;
  }
  .btn {
    position: absolute;
    top: 10px;
    right: 0;
  }
}
</style>
