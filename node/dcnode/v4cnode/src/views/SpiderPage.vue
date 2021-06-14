<template>
  <div class="spider-wrapper">
    <h2>爬虫</h2>
    <el-button type="info" @click="getData">豆瓣TOP250</el-button>
    <el-button type="success" @click="pushReq">发请求</el-button>
    <div v-html="content"></div>
  </div>
</template>

<script>
import api from "@/requests/api";

export default {
  data() {
    return {
      content:''
    }
  },
  methods:{
    getData(){
      api.handleSpider().then(res=>{
        console.log(res.data);
        this.content=res.data
      })
    },
    pushReq(){
      api.pushReq().then(res=>{
        console.log(res.data);
        this.content=res.data
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">

</style>
