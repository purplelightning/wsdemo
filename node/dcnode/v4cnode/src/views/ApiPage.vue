<template>
  <div class="wrapper">
    <div v-html="content"></div>
  </div>
</template>

<script>
import { baseUrl } from '@/requests/http'

export default {
  data() {
    return {
      content: {},
    };
  },
  mounted() {
    location.href=`${baseUrl}/apidoc`
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
</style>
