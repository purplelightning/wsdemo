<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { provide } from "vue";

import Chead from "@/components/Chead.vue";
import { tip } from "@/utils";

provide("$msg", tip);

const $msg = tip;
</script>

<template>
  <Chead></Chead>
  <router-view></router-view>
</template>

<style>
#app {
  padding: 0;
  margin: 0;
}
</style>
