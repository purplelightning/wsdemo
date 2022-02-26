<template>
  <div class="chead">
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
      <span v-show="!userStore.isLogin" class="item center">个人中心</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="userStore.doLoginout">
            <el-icon><HomeFilled /></el-icon>主页
          </el-dropdown-item>
          <el-dropdown-item @click="goAddTopic">
            <el-icon><CirclePlus /></el-icon>发表话题
          </el-dropdown-item>
          <el-dropdown-item @click="userStore.doLoginout">
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
  HomeFilled,
} from "@element-plus/icons";

const headOption = [
  { path: "/", name: "CNODE社区" },
  { path: "/tool", name: "工具" },
  { path: "/spider", name: "爬虫" },
  { path: "/excerise", name: "测试" },
];

const userStore = useUserStore();
const router = useRouter();
console.log(router.currentRoute.value.path);
const currentPath: Ref<string> = computed(() => router.currentRoute.value.path);
const goAddTopic = () => {
  router.push({ path: "/addTopic" });
};
</script>
<style lang="less" scoped>
.chead {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: linear-gradient(
    to right,
    rgba(22, 22, 232, 0.5),
    rgba(221, 151, 151, 0.4)
  );
  a {
    text-decoration: none;
  }
  .item {
    margin-left: 40px;
    line-height: 60px;
    display: inline-block;
    &:hover {
      color: #fff;
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
    color: #fff;
  }
}
</style>
