<template>
	<view class="info">
		<text class="name">{{loginname || '游客'}}</text>
		<text class="phone" v-show="phone">{{phone}}</text>
		<img v-show="loginname" :src="avatarImg">
		<img v-show="!loginname" :src="pic">
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { baseUrl } from '../../common/util.js'
	import pic from '../../static/anoymous.jpeg'
	export default {
		data(){
			return{
				pic: pic
			}
		},
		computed:{
			...mapState(['avatarImg','loginname', 'phone']),
		}
	}
	
</script>

<style lang="less" scoped>
	.info{
		position: relative;
		.name{
			position: absolute;
			top: 60rpx;
			left: 40rpx;
		}
		img{
			position: absolute;
			top: 60rpx;
			right: 20rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}
</style>
