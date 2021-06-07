<template>
  <div class="topic-wrapper">
    <div class="name" v-show="type==='add'">添加Topic</div>
    <div class="name" v-show="type==='edit'">编辑Topic</div>
    <el-form ref="form" :model="form">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";

import api from "@/requests/api";

export default {
  name: "ManageTopic",
  data() {
    return {
      form: {
        title: this.$route.params.ftitle || "",
        content: this.$route.params.fcontent || "",
      },
      topicId: this.$route.params.topicId || ""
    };
  },
  mounted(){
    if(this.form.content){
      let dom = document.createElement('div')
      dom.innerHTML = this.form.content
      this.form.content = dom.innerText
    }
  },
  methods: {
    doSubmit() {
      if (!this.form.title || !this.form.content) {
        this.$message({
          type: "info",
          message: "请输入标题或内容",
        });
        return;
      }
      const params = {
        title: this.form.title,
        tab: "dev",
        content: this.form.content,
        author: this.loginname,
      };
      if(!this.topicId){
        api.addTopic(params).then((res) => {
          if (res.status) {
            this.$message.success('话题添加成功')
            this.form.title = "";
            this.form.content = "";
            setTimeout(()=>{
              this.$router.history.push({name: 'Home'})
            }, 1000)
          }else{
            this.$message.error(err.error_msg)
          }
        });
      }else{
        params.topic_id = this.topicId
        api.updateTopic(params).then((res) => {
          if (res.success) {
            this.$message.success('话题修改成功')
            this.form.title = "";
            this.form.content = "";
            setTimeout(()=>{
              this.$router.history.push({name: 'Home'})
            }, 1000)
          }else{
            this.$message.error('话题修改失败')
          }
        })
      }
    },
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    ...mapState(["loginname"]),
  },
};
</script>
<style lang='less' scoped>
.topic-wrapper {
  .el-form {
    margin: 20px auto 0 auto;
    padding: 30px;
    width: 500px;
    height: 500px;
  }
}
</style>