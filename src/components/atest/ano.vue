<template>
  <h1>{{mytitle}} </h1>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return{
        mytitle:"又一个组件测试"
      }
    }

  }
</script>

<style scoped="">
  h1 {
    color: green;
  }
</style>
