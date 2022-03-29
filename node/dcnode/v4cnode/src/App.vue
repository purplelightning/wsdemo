<template>
  <div id="app">
    <myloading v-if='LOADING' style="position: fixed;z-index: 200"></myloading>
    <chead></chead>
    <myfoot></myfoot>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Chead from "./components/Chead";
import Myloading from './common/LoadingEyeExplo' //加载组件的位置
import Myfoot from './common/Myfoot.vue'
export default {
  name: "App",
  components: { Chead, Myloading, Myfoot},
  computed:{
    ...mapState([
      'LOADING'
    ])
  }
  
};
</script>

<style>
#app {
  padding-top: 60px;
}
</style>
