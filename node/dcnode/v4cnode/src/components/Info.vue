<template>
  <div id="info-wrapper">
    <div id="info">
      <div class="top">
        <img @click="showAvatarModal"  width="50" height="50" :src="avatarImg" />
        <span @click="goFav">{{loginname}}</span>
      </div>
    </div>
    <el-button type="success" @click="goCreate">发布话题</el-button>
    <change-avatar></change-avatar>
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
    margin-bottom: 60px;
    .top{
      height: 60px;
      vertical-align: top;
      img{
        float: left;
        cursor: pointer;
      }
      span{
        line-height: 50px;
        color: #999;
      }
    }
  }
}
</style>