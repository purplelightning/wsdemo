<template>
  <div class="guide1">
    <div>{{ num1 }}</div>
    <div>{{ num2 }}</div>
  </div>
</template>

<script>
import EventBus from "../../utils/EventBus";

export default {
  data() {
    return {
      num1: 0,
      num2: 0,
    };
  },
  mounted() {
    EventBus.on("add", (data) => {
      this.num1 += data;
    });
    EventBus.once("add", (data) => {
      this.num2 += data;
    });
  },
};
</script>

<style scoped lang="less">
.guide1 {
  float: left;
  width: 300px;
  height: 300px;
}
</style>
