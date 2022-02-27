<template>
  <div id="info">
    <div class="item">
      <span class="name">用户名：</span>
      <span class="val">{{ userStore.loginName }}</span>
    </div>
    <div class="item">
      <span class="name">头像:</span>
      <img width="50" height="50" :src="userStore.avatarImg" />
    </div>
    <el-button @click="showAvatarModal">修改头像</el-button>
    <div v-show="showFlag">
      <change-avatar @closeAvatar="showFlag = false"></change-avatar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { Ref, ref } from "vue-demi";
const userStore = useUserStore();

const showFlag: Ref<boolean> = ref(false);
const showAvatarModal = () => {
  showFlag.value = true;
};
</script>
<style lang="less" scoped>
#info {
  margin-left: 50px;
  .item {
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
    .name {
      display: inline-block;
      width: 80px;
    }
    img {
      vertical-align: top;
    }
  }
  .el-button {
    margin-top: 30px;
  }
}
</style>
