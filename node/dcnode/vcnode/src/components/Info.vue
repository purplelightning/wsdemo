<template>
  <div id="info-wrapper">
    <div id="info">
      <div class="top">
        <img width="50" height="50" :src="avatarImg" />
        <span>{{loginname}}</span>
      </div>
    </div>
    <el-button type="success" @click="goCreate">发布话题</el-button>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Info",
  data() {
    return {};
  },
  components: {},
  methods: {
    goCreate() {
      this.$router.history.push({name:"ManageTopic", params: {type:'add'}});
    },
  },
  computed: {
    ...mapState(["loginname", "avatarImg"]),
  },
};
</script>
<style lang='less' scoped>
#info-wrapper {
  padding: 10px;
  text-align: center;
  #info{
    margin-bottom: 60px;
    .top{
      height: 60px;
      vertical-align: top;
      img{
        float: left;
      }
      span{
        line-height: 50px;
        color: #999;
      }
    }
  }
}
</style>