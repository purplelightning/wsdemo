<template>
  <div id="app">
    <chead></chead>
    <router-view></router-view>
  </div>
</template>

<script>
import Chead from "./components/Chead";
export default {
  name: "App",
  components: { Chead },
};
</script>

<style>
#app {
  padding-top: 60px;
}
</style>
