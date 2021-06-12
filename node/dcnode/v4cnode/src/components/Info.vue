<template>
  <div id="info-wrapper">
    <div id="info">
      <div class="top">
        <img @click="showAvatarModal" title="修改头像" width="50" height="50" :src="avatarImg" />
        <span @click="goFav">{{loginname}}</span>
      </div>
    </div>
    <el-button type="success" @click="goCreate">发布话题</el-button>
    <div v-show="showFlag">
      <change-avatar @closeAvatar="closeModal"></change-avatar>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ChangeAvatar from 'common/ChangeAvatar.vue';

export default {
  name: "Info",
  data() {
    return {
      showFlag: false
    };
  },
  components: {ChangeAvatar},
  methods: {
    goCreate() {
      this.$router.history.push({name:"ManageTopic", params: {type:'add'}});
    },
    goFav(){
      this.$router.history.push({name:"Collection"});
    },
    showAvatarModal(){
      this.showFlag = true
    },
    closeModal(){
      this.showFlag = false
    }
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
    margin-bottom: 30px;
    .top{
      height: 60px;
      vertical-align: top;
      img{
        float: left;
        cursor: pointer;
      }
      span{
        display: inline-block;
        line-height: 50px;
        color: #999;
        cursor: pointer;
      }
    }
  }
}
</style>