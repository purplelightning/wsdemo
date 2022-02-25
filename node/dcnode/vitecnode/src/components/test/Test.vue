<template>
  <div class="test">
    这是Test组件
    {{ type }}
    <br />
    {{ ftype }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

export default defineComponent({
  props: {
    ftype: String,
  },
  setup(props: any, context: any) {
    console.log(props.ftype);
    console.log(context);
    console.log(context.attrs.text);
    const type: Ref<string> = ref("新闻");
    return {
      type,
    };
  },
});
</script>
