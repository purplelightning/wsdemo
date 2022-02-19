<template>
  <div class="wrapper">
    test
    <my-button>
      <div slot="abc">abc</div>
      bbbb
      <div slot="ddd">ddd</div>
    </my-button>
  </div>
</template>

<script>
import MyButton from '../common/MyButton.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    MyButton
  }
}
</script>

<style scoped lang="less">

</style>
