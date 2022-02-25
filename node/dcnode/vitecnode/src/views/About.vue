<template>
  <div class="about-container">
    <h2>sss</h2>
    {{ msg }}
    {{ userState.name }}
    <Test @change="dd" ftype="父组件传递的值" text="文本传输"></Test>
    <TestSetup
      ref="son"
      @sendData="dd"
      ftype="父组件给setup语法糖的值"
    ></TestSetup>
    <Suspense>
      <TestAwait></TestAwait>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, Ref, ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { getUserTest, loginAPI } from "@/api/user";
import Test from "@/components/test/Test.vue";
import TestSetup from "@/components/test/TestSetup.vue";
import TestAwait from "@/components/test/TestAwait.vue";

const msg: Ref<string> = ref("aaa");
const userState = useUserStore();
const dd = (val: string) => {
  console.log("返回给父组件的值：" + val);
};
const son = ref(null);
console.log(son.value);
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

<style lang="less" scoped>
.about-container {
  h2 {
    color: blue;
    background: #ccc;
  }
}
</style>
