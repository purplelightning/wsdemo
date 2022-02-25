<template>
  <h1>{{ result }}</h1>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
const result: Ref<string> = ref("");
const promiseFun = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("22322323"), 3000);
  });
};
result.value = await promiseFun();
</script>
