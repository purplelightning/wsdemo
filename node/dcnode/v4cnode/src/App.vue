<template>
  <div id="app" :class="{'bg':!showAnimation}">
    <chead></chead>
    <el-switch v-model="showAnimation"></el-switch>
    <router-view></router-view>
    <animation-page :show="showAnimation"></animation-page>
    
  </div>
</template>

<script>
import Chead from "./components/Chead";
import AnimationPage from "./views/AnimationPage";

export default {
  name: "App",
  components: { Chead, AnimationPage },
  data(){
    return {
      showAnimation: true
    }
  }
};
</script>

<style lang="less">
#app {
  position: fixed;
  top: 0;
  left:0;
  bottom:0;
  width: 100%;
  padding-top: 60px;
}
.bg{
  background: #fff;
}
</style>
