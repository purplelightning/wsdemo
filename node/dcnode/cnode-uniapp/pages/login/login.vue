<template>
	<view class="backlogin">
		<EloadingMP></EloadingMP>
		<ToastMP></ToastMP>
		<view class="login_box">
			<view class="item">
				<input class="myinput" type="text" placeholder="手机号/用户名" v-model="name" />
			</view>
			<view class="item">
				<input class="myinput" type="password" placeholder="密码" v-model="pwd" />
			</view>
		</view>
		<view class="login_other">
			<a href="javascript:;">找回密码</a>
			<label class="rem">
				<checkbox id="remenberme" :value="remenberme" /><text>记住我</text>
			</label>
		</view>
		<button :disabled="disablebtn" class="login" @click="doLogin">登录</button>
		<button :disabled="disablebtn" class="login register" @click="doLogin('new')">注册</button>
		<button :disabled="disablebtn" class="login wechat" @click="wechatLogin">微信登录</button>
		<button :disabled="disablebtn" class="login anny" @click="goMainPage">游客访问</button>
	</view>
</template>

<script>
	import { baseUrl } from '../../common/util.js'
	import { getLogin, getRegister } from '../../api/index.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				name: '',
				pwd:'',
				disablebtn: false,
				remenberme: ''
			};
		},
		mounted(){
			if(this.isLogin){
				this.goMainPage()
			}
		},
		methods:{
			...mapMutations(['handleLogin']),
			doLogin(type){
				this.disablebtn = true
				const params={
					username: this.name,
					password: this.pwd
				}
				let url = getLogin
				if(type === 'new'){
					url = getRegister
				}
				this.$loading(true)
				//原始插件方法
				// this.$loading()
				this.$http.post(url,params).then(res=>{
					this.disablebtn = false
					this.cleanData()
					this.$loading(false)
					//原始插件方法
					// setTimeout(()=>{
					// 	this.$loading.close()
					// },2000)
					if(res.status){
						this.$toast(res.msg || res.data)
						if(url === '/user/signup'){
							return
						}
						this.handleLogin({
							id: res.data.id,
							loginname: res.data.username,
							token: res.data.token,
							avatarImg: baseUrl + res.data.avatarImg,
							phone: res.data.phone,
							isLogin: Boolean(res.data.id)
						})
						setTimeout(()=>{
							this.goMainPage()
						},1000)
					}else{
						this.$toast({msg: res.error, type:'error'})
					}
				})
			},
			goMainPage(){
				console.log('gomain');
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			wechatLogin(){
			},
			cleanData(){
				this.name = ''
				this.pwd = ''
			}
		},
		computed:{
			...mapState(['isLogin'])
		}
	}
</script>

<style lang="less" scoped>
.login_box {
	padding-top: 100rpx;
  width: 640rpx;
  margin: 60rpx auto;
}
.login_box .myinput {
  width: 100%;
  border: 1rpx solid #cad3de;
  height: 80rpx;
  line-height: 80rpx;
  margin: 10rpx 0 20rpx;
  border-radius: 6rpx;
  padding: 0 20rpx;
  outline: none;
  box-sizing: border-box;
}
.login_box .myinput:focus {
  border: 1rpx solid #4289dc;
}
.login_other {
  overflow: hidden;
}
.rem{
	margin-left: 50rpx;
}

.login_other a {
  float: right;
	margin-right: 50rpx;
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
  margin: 4rpx 5rpx 0 0;
}
.login {
	margin-top: 30rpx;
	width: 80%;
  border: none 0;
  height: 88rpx;
  line-height: 88rpx;
  background: #4187db;
  font-size: 32rpx;
  border-radius: 6rpx;
  margin-right: 80rpx;
  transition: all 0.5s ease;
  cursor: pointer;
  outline: none;
  color: #fff;
  box-sizing: border-box;
}
.register{
  background: #33bb33;
}
.anny{
	background: gold;
}
.wechat{
	background: purple;
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
  margin: 0 0 20rpx 0;
}
</style>
