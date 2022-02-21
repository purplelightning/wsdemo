<script setup lang="ts">
import { defineComponent,Ref, ref } from 'vue'
import {useUserStore} from '@/store/user'

const msg:Ref<string> = ref('aaa')
const userState = useUserStore()

</script>

<template>
  <div class="about-container">
    <h2>sss</h2>
    {{msg}}
    {{userState.name}}
  </div>
</template>
<style lang="less" scoped>
.about-container{
  h2{
    color: blue;
  }
}
</style>