<template>
  <div class="guide-wrapper">
    <guide1></guide1>
    <guide2></guide2>
  </div>
</template>

<script>
import guide1 from '../components/guide/guide1.vue'
import guide2 from '../components/guide/guide2.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    guide1, guide2
  }
}
</script>

<style scoped lang="less">

</style>
