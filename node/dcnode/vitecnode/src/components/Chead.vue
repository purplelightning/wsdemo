<template>
  <div id="head-wrapper">
    <router-link
      :key="index"
      v-for="(item, index) in headOption"
      class="item"
      :class="{ active: item.path === currentPath }"
      :to="item.path"
      >{{ item.name }}</router-link
    >
    <router-link
      v-show="!userStore.isLogin"
      class="item"
      :class="{ active: '/register' === currentPath }"
      to="/register"
      >注册</router-link
    >
    <router-link
      v-show="!userStore.isLogin"
      class="item"
      :class="{ active: '/login' === currentPath }"
      to="/login"
      >登录</router-link
    >
    <el-dropdown>
      <span v-show="userStore.isLogin" class="item center">个人中心</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goCenter">
            <el-icon><User /></el-icon>主页
          </el-dropdown-item>
          <el-dropdown-item @click="goAddTopic">
            <el-icon><CirclePlus /></el-icon>发表话题
          </el-dropdown-item>
          <el-dropdown-item @click="goLogin">
            <el-icon><SwitchButton /></el-icon>退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { computed, ref, Ref } from "vue";
import {
  SwitchButton,
  Avatar,
  CirclePlus,
  Tools,
  User,
} from "@element-plus/icons";

const headOption = [
  { path: "/", name: "CNODE社区" },
  { path: "/tool", name: "工具" },
  { path: "/spider", name: "爬虫" },
  { path: "/excerise", name: "测试" },
];

const userStore = useUserStore();
const router = useRouter();
const currentPath: Ref<string> = computed(() => router.currentRoute.value.path);
const goAddTopic = () => {
  router.push({ path: "/addTopic" });
};
const goCenter = () => {
  router.push("/userCenter");
};
const goLogin = () => {
  userStore.doLoginout();
  router.push("/login");
};
</script>
<style lang="less" scoped>
#head-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 1000;

  background: linear-gradient(
    to right,
    rgba(151, 22, 232, 1),
    rgba(33, 151, 221, 1)
  );
  a {
    text-decoration: none;
  }
  .item {
    margin-left: 40px;
    line-height: 60px;
    display: inline-block;
    color: #fff;
    &:hover {
      color: #0ff;
      font-size: 1.1em;
    }
  }
  .item:first-of-type {
    min-width: 90px;
  }
  .center {
    float: right;
  }
  .active {
    color: #0ff;
    text-shadow: #3faaff 1px 1px;
    font-size: 1.1em;
  }
}
</style>
