<template>
  <div class="btn-class">
    <div>Provide,inject：{{app.name}}</div>
    <div>从根组件的minxins获取到数据ggg：{{app.ggg}}</div>
    <div class="btn">
      <slot name="abc"></slot>
      <slot></slot>
      <slot name="ddd"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
    };
  },
  inject:['app']
}

</script>
<style lang='less' scoped>
.btn-class{
  width: 360px;
  border: 1px solid black;
  .btn{
    border: 1px solid #ccc;
  }
}
</style>