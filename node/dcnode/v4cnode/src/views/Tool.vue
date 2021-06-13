<template>
  <div class="wrapper">
    <h2>工具页</h2>
    <el-button type="primary" @click="handlePdf">本地PDF处理</el-button>
    上传发票：<input type="file" accept=".pdf" @change="uploadBill"/>
  </div>
</template>

<script>
import api from "@/requests/api";
import { baseUrl } from '@/requests/http'

export default {
  data() {
    return {

    }
  },
  methods:{
    handlePdf(){
      api.handlePdf().then(res=>{
        this.$message.success(res.data)
      })
    },
    uploadBill(e){
      let dd = e.target.files[0]
      let data = new FormData()
      data.append('ppp', dd)
      api.uploadBill(data).then(res=>{
        let newurl = baseUrl+ res.data.url.replace('public','')
        window.open(newurl, "_blank")
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
.el-button{
  margin: 20px;
}
</style>
