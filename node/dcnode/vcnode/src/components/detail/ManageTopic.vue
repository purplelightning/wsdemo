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

import urlObj from "../../common/api";

export default {
  name: "ManageTopic",
  data() {
    return {
      form: {
        title: "",
        content: "",
      },
    };
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
        accesstoken: this.token,
        title: this.form.title,
        tab: "dev",
        content: this.form.content,
      };
      this.$http.post(urlObj.addTopic(), params).then((res) => {
        if (res.success) {
          this.$message({
            type: "success",
            message: "话题添加成功",
          });
          this.form.title = "";
          this.form.content = "";
          setTimeout(()=>{
            this.$router.history.push({name: 'Home'})
          }, 1000)
        }
      });
    },
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    ...mapState(["token"]),
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