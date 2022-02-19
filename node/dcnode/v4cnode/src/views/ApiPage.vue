<template>
  <div class="wrapper">
    <div v-html="content"></div>
  </div>
</template>

<script>
import api from "@/requests/api";

export default {
  data() {
    return {
      content: {},
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {
      api.getApiPage().then((res) => {
        this.content = res;
      });
    },
  },
};
</script>

<style scoped lang="less">
</style>
