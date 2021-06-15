<template>
  <div class="spider-wrapper">
    <h2>爬虫</h2>
    <el-button type="info" @click="getData">豆瓣TOP250</el-button>
    <el-button type="success" @click="pushReq">发请求</el-button>
    <hr/>
    <div class="item">
      <el-input v-model="courseUrl">fffffffff</el-input>
      <el-button @click="craw">爬取</el-button>
    </div>
    
    <div v-html="content"></div>
  </div>
</template>

<script>
import api from "@/requests/api";

export default {
  data() {
    return {
      content:'',
      courseUrl:''
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
    },
    craw(){
      if(!this.courseUrl){
        this.$message.error('请输入合法的url')
        return
      }
      api.crawMooc(this.courseUrl).then(res=>{
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
.item{
  display: flex;
  width: 300px;
  .el-input{
    flex: 1;
  }
  button{
    flex: 0 0 50px;
  }
}
</style>
