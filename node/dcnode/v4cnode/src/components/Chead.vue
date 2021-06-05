<template>
  <div id="head-wrapper">
    <div class="left">
      <router-link exact to="/">CNODE社区</router-link>
      <div class="search"></div>
    </div>
    <div class="right">
      <router-link class="item" to="/guide">新手入门</router-link>
      <router-link class="item" to="/apipage">API</router-link>
      <router-link class="item" to="/about">关于</router-link>
      <div v-show="!isLogin" class="item" @click="register">注册</div>
      <div v-show="!isLogin" class="item" @click="login">登录</div>
      <div v-show="isLogin" class="item">设置</div>
      <div v-show="isLogin" class="item" @click="logout">退出</div>

      <div class="modal-wrapper" v-show="showLoginBox">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Token">
            <el-input v-model="form.token"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import api from '@/requests/api'

export default {
  data() {
    return {
      showLoginBox: false,
      form: {
        token: ''
      }
    }
  },
  methods: {
    ...mapMutations(['doLogin', 'doLogout']),
    login(){
      this.showLoginBox = true
    },
    onSubmit(){
      const token = this.form.token
      api.getUserInfo({accesstoken: token}).then(res => {
        this.$message({type:'success', message:'登录成功'})
        this.form.token = ''
        const params = {
          id: res.id,
          loginname: res.loginname,
          avatarImg: res.avatar_url,
          token: token
        }
        this.doLogin(params)
        this.closeModal()
      }).catch(() => {
        this.$message({type:'error', message:'登录失败'})
      })
    },
    logout(){
      this.doLogout()
      this.$message({type:'success', message:'退出登录'})
    },
    closeModal(){
      this.showLoginBox = false
    },
    register(){

    },
  },
  computed:{
    ...mapState(['loginname', 'isLogin', 'avatarImg']),
  }
}
</script>

<style scoped lang="less">
#head-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 60px;
  min-width: 550px;
  background: #444;
  text-decoration: none;
  z-index: 1000;
  .left{
    margin-left: 60px;
    a{
      color: #ccc;
      text-decoration: none;
    }
    .active{
      color: #fff;
      font-size: 1.2em;
    }
  }
  .right{
    position: absolute;
    height: 60px;
    top: 0;
    right: 60px;
    .item{
      display: inline-block;
      margin-right: 20px;
      line-height: 60px;
      height: 100%;
      color: #ccc;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
    }
    .active{
      color: #fff;
      font-size: 1.2em;
    }
    .avatar{
      position: absolute;
      top: 10px;
      right: -50px;
      width: 50px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  .modal-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    right: 0;
    background: rgba(22,22,22,.8);
    .el-form{
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 20px;
      width: 350px;
      background: #fff;
      border-radius: 5px;
    }
  }
}
</style>
