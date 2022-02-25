<template>
  <div>
    这是TestSetup组件
    {{ tpe }}
    <el-button @click="sendString">点我</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";

const tpe: Ref<string> = ref("hlleo");
const props = defineProps({
  ftype: {
    type: String,
  },
});
console.log(props);
console.log(props.ftype);
const emits = defineEmits(["sendData"]);
const sendString = () => {
  emits("sendData", "gggggggggg");
};
const childText = ref("子元素数据");
defineExpose({
  childText,
});
</script>
