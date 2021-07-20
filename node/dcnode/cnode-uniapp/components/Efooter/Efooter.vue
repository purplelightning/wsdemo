<template>
	<view class="footer">
		<uni-icons type="plusempty" size="28" @click="addTopic"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"Efooter",
		data() {
			return {
				
			};
		},
		methods:{
			addTopic(){
				console.log('hhhhhhh');
				uni.navigateTo({
					url: '/pages/Topic/AddTopic/AddTopic'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.footer{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	background: #fff;
}
</style>
