<template>
  <div class="backlogin">
    <div class="login_box">
      <div class="title">EXPRESS-CNODE登录</div>
      <div>
        <input class="myinput" type="text" placeholder="手机号/用户名" v-model="username" />
      </div>
      <div>
        <input @keyup.13="login" class="myinput" type="password" placeholder="口令" v-model="password" />
      </div>
      <div class="login_other">
        <a href="javascript:;">找回密码</a>
        <input type="checkbox" id="remenberme" /><label for="remenberme">记住我</label>
      </div>
      <button :disabled="disablebtn" class="login" @click="login">{{loginText}}</button>
      <button :disabled="disablebtn" class="login register" @click="register">注册</button>
    </div>
  </div>
</template>

<script>
import api from '@/requests/api'
import { mapMutations } from 'vuex'
import { baseUrl } from '@/requests/http'

export default {
  name: "Login",
  data() {
    return {
      username: "admin" /*TODO:先预存测试值，以免手动输入*/,
      password: "123456",
      disablebtn: false,
      loginText: "登录",
    };
  },
  methods: {
    ...mapMutations(['doLogin']),
    login(){
      this.disablebtn=true
      // this.logText='登录中...'
      api.getLogin({
        username: this.username,
        password: this.password
      }).then(res=>{
        if(res.error){
          this.$message.error(res.error)
        }else{
          this.$message.success(res.msg)
          const obj = res.data
          obj.avatarImg = baseUrl + obj.avatarImg
          this.doLogin(res.data)
          this.$router.push({path:'/'})
        }
        this.disablebtn=false
        this.loginText='登录'
      }).catch(err=>{
        this.disablebtn=false
        this.loginText='登录'
      })
    },
    register(){
      api.getRegister({
        username: this.username,
        password: this.password
      }).then(res=>{
        if(res.status){
          this.$message.success(res.data)
        }else{
          this.$message.error(res.error)
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 60px;
  box-shadow: 0 1px 5px rgba(13, 62, 73, 0.2);
}
.header img {
  width: 170px;
  margin-top: 12px;
  margin-left: 15px;
  float: left;
}
.header span {
  float: left;
  color: #566a80;
  margin: 21px 0 0 20px;
}
.login_box {
  width: 320px;
  margin: 50px auto;
}
.login_box .myinput {
  width: 100%;
  border: 1px solid #cad3de;
  height: 40px;
  line-height: 40px;
  margin: 5px 0 10px;
  border-radius: 3px;
  padding: 0 10px;
  outline: none;
  box-sizing: border-box;
}
.login_box .myinput:focus {
  border: 1px solid #4289dc;
}
.login_other {
  overflow: hidden;
}

.login_other a {
  float: right;
  color: #727f8f;
}
.login_other a:hover {
  color: #273444;
}
.login_other input,
.login_other label {
  float: left;
  color: #727f8f;
}
.login_other input {
  margin: 4px 5px 0 0;
}
.login {
  box-sizing: border-box;
  border: none 0;
  height: 44px;
  line-height: 44px;
  width: 100%;
  background: #4187db;
  font-size: 16px;
  border-radius: 3px;
  margin-right: 40px;
  transition: all 0.5s ease;
  cursor: pointer;
  outline: none;
  color: #fff;
  margin-top: 15px;
}
.register{
  background: #33bb33;
}
.login:hover {
  background: #2668b5;
}
.register:hover{
  background: #339933;
}
.login[disabled] {
  opacity: 0.8;
}
.login[disabled]:hover {
  background: #4187db;
}
.title {
  color: #273444;
  font-size: 1.5em;
  text-align: center;
  margin: 0 0 20px 0;
}

@media only screen and (max-width: 768px) {
  .login_box {
    width: 280px;
    margin: 50px auto;
  }
}
</style>