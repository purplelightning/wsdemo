<script setup lang="ts">
import { defineComponent, Ref, ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { getUserTest, loginAPI } from "@/api/user";

const msg: Ref<string> = ref("aaa");
const userState = useUserStore();
onMounted(() => {
  getUserTest().then((res: any) => {
    console.log(res);
  });
  getUserTest().then((res: any) => {
    console.log(res);
  });
  getUserTest().then((res: any) => {
    console.log(res);
  });
  // loginAPI({ name: "ss", pwd: "123" }).then((res: any) => {
  //   console.log(res.data);
  // });
});
</script>

<template>
  <div class="about-container">
    <h2>sss</h2>
    {{ msg }}
    {{ userState.name }}
  </div>
</template>
<style lang="less" scoped>
.about-container {
  h2 {
    color: blue;
    background: #ccc;
  }
}
</style>
