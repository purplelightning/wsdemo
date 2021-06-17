<template>
  <div class="spider-wrapper">
    <h2>爬虫</h2>
    <el-button type="info" @click="getData">豆瓣TOP250</el-button>
    <el-button type="success" @click="pushReq">发请求</el-button>
    <hr/>
    <div class="item">
      <el-input v-model="courseUrl"></el-input>
      <el-button @click="craw">爬取</el-button>
      <el-checkbox-button v-model="checked">课程列表</el-checkbox-button>
    </div>
    <div class="item1">
      <el-input placeholder="网址" v-model="imgUrl"></el-input>
      <el-input placeholder="类型" v-model="imgType"></el-input>
      <el-button @click="crawManga">获取图片</el-button>
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
      courseUrl:'',
      checked: false,
      imgUrl: '',
      imgType: ''
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
      let type = ''
      if(this.checked){
        type = 'fff'
      }
      api.crawMooc(this.courseUrl, type).then(res=>{
        console.log(res.data);
        this.content=res.data
      })
    },
    crawManga(){
      api.crawManga(this.imgUrl, this.imgType).then(res=>{
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
  width: 600px;
  .el-input{
    flex: 1;
  }
  button{
    margin-right: 30px;
    flex: 0 0 50px;
  }
}
.item1{
  margin-top: 30px;
  width: 800px;
  .el-input{
    width: 100px;
  }
  .el-input:first-child{
    margin-right: 30px;
    width: 350px;
  }
  button{
    margin-left: 30px;
    width: 100px;
  }
}
</style>
