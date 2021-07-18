<template>
	<view class="info">
		<text class="name">{{loginname}}</text>
		<text class="phone">{{phone}}</text>
		<img :src="avatarUrl">
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { baseUrl } from '../../common/util.js'
	export default {
		data(){
			return{
				
			}
		},
		computed:{
			...mapState(['avatarImg','loginname', 'phone']),
			avatarUrl(){
				return baseUrl + this.avatarImg
			}
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
