<template>
  <div class="chead">
    <router-link class="item" to="/">CNODE社区</router-link>
    <router-link class="item" to="/api">API</router-link>
    <router-link class="item" to="/tool">工具</router-link>
    <router-link class="item" to="/spider">爬虫</router-link>
    <router-link class="item" to="/excerise">测试</router-link>
    <router-link v-show="!userStore.isLogin" class="item" to="/register"
      >注册</router-link
    >
    <router-link v-show="!userStore.isLogin" class="item" to="/login"
      >登录</router-link
    >
    <el-dropdown>
      <span v-show="!userStore.isLogin" class="item">个人中心</span>
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
import { useAttrs } from "vue";
import {
  SwitchButton,
  Avatar,
  CirclePlus,
  Tools,
  HomeFilled,
} from "@element-plus/icons";

const userStore = useUserStore();
const router = useRouter();
const goAddTopic = () => {
  router.push({ path: "/addTopic" });
};
</script>
<style lang="less" scoped>
.chead {
  display: flex;
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
    flex: 1;
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
}
</style>
