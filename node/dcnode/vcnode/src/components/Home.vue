<template>
  <div id="home">
    <chead></chead>
    <router-view/>
  </div>
</template>

<script>
import Chead from './Chead'

export default {
  data() {
    return {

    }
  },
  components: {
    Chead
  }
}
</script>

<style scoped lang="less">
#home{
  padding-top: 60px;
}
</style>
