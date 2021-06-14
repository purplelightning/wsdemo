<template>
  <div class="wrapper">
    <h2>工具页</h2>
    <el-button type="primary" @click="handlePdf">本地PDF处理</el-button>
    上传发票：<input type="file" accept=".pdf" @change="uploadBill"/>
    <hr/>
    <el-button type="success" @click="downloadExcel">本地excel处理</el-button>
    pdf-to-excel：<input type="file" accept=".pdf" @change="ptoexc">
    <hr/>
    <el-button type="warning" @click="handleZip">本地压缩包处理</el-button>
    压缩包处理：<input type="file" accept=".zip" @change="uploadZip">
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
    },
    downloadExcel(){
      api.downloadExcel().then(res => {
        console.log(res);
      })
    },
    ptoexc(e){
      let dd = e.target.files[0]
      let data = new FormData()
      data.append('pte', dd)
      api.ptoexc(data).then(res => {
        let newurl = baseUrl+ res.data.url.replace('public','')
        window.open(newurl, "_blank")
      })
    },
    handleZip(){
      api.handleZip().then(res=>{
        console.log(res);
      })
    },
    uploadZip(e){
      let dd = e.target.files[0]
      let data = new FormData()
      data.append('zzz', dd)
      api.uploadZip(data).then(res=>{
        this.$message.success(res.data.msg)
        let newurl = baseUrl+ res.data.url.replace('public','')
        window.open(newurl, "_blank")
      })
    },
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
