<template>
	<view class="footer">
		<ToastMP></ToastMP>
		<uni-icons type="plusempty" size="28" @click="addTopic"></uni-icons>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:"Efooter",
		data() {
			return {
				
			};
		},
		methods:{
			addTopic(){
				if(!this.isLogin){
					this.$toast({msg:'请先登录', type:'info'})
					uni.navigateTo({
						url: '/pages/login/Login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/Topic/ManageTopic/ManageTopic'
				})
			}
		},
		computed:{
			...mapState(['isLogin'])
		}
	}
</script>

<style lang="less" scoped>
.footer{
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	background: #fff;
}
</style>
