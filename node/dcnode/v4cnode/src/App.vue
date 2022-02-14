<template>
  <div id="app">
    <myloading v-if='LOADING' style="position: fixed;z-index: 200"></myloading>
    <chead></chead>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Chead from "./components/Chead";
import Myloading from './common/LoadingEyeExplo' //加载组件的位置
export default {
  name: "App",
  components: { Chead, Myloading },
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
