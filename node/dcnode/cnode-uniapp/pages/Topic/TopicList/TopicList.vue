<template>
	<scroll-view class="list-wrapper">
		<uni-list class="list" v-show="bolist.length&&!favFlag">
			<view v-for="(item, index) in bolist" :key="index" class="item">
				<img class="user-avatar" :src="item.author&&item.author.avatarUrl">
				<view class="des">
					<view class="name">{{item.author.name}}</view>
					<view class="tabname">{{item.top ? '置顶' : tabObj[item.tab]}}</view>
				</view>
				<view class="content">
					<view class="title" @click="goDetail(item._id)">{{item.title}}</view>
					<view class="count">{{item.replyCount}}/{{item.visitCount}}</view>
				</view>
				<view class="last-reply" v-show="item.createTime">{{item.createTime | sliceTime}}</view>
			</view>
		</uni-list>
		<view class="list" v-show="bolist.length&&favFlag">
			<view class="item" :key=index v-for="(item,index) in bolist">
				<img class="user-avatar" :src="item.author && item.author.avatarUrl" />
				<view class="des">
					<view class="name">{{item.author.name}}</view>
				</view>
				<view class="content">
					<view class="title" @click="goDetail(item._id)">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="no-data" v-show="!bolist.length">
			<view>暂无数据</view>
		</view>
	</scroll-view>
</template>

<script>
	import { baseUrl } from '../../../common/util.js'

	export default {
		props: ['bolist', 'favFlag'],
		data() {
			return {
				tabObj: {
					'share': '分享',
					'ask': '问答',
					'good': '精华',
					'job': '招聘',
					'dev': '测试'
				}
			}
		},
		onLoad() {
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/Topic/TopicDetail/TopicDetail?id=${id}`
				});
			}
		},
		filters: {
			sliceTime(time) {
				if (time) {
					return time.slice(5)
				}
				return ''
			}
		}
	}
</script>

<style lang="less">
	.list {
		.item {
			position: relative;
			display: flex;
			padding: 10rpx;
			width: 100%;
			height: 120rpx;
			box-sizing: border-box;
			font-size: 12px;
			border-bottom: 1rpx solid #ccc;
			.user-avatar {
				flex: 0 0 80rpx;
				margin-top: 10rpx;
				margin-right: 10rpx;
				width: 80rpx;
				height: 80rpx;
			}
			.des{
				flex: 0 0 80rpx;
				display: flex;
				flex-direction: column;
			}
			.name {
				flex: 1;
				width: 80rpx;
				height: 30rpx;
				color: #999;
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				text-wrap: no-wrap;
			}
			.tabname {
				flex: 0 0 30rpx;
				padding: 3rpx 6rpx;
				width: 60rpx;
				height: 20rpx;
				line-height: 30rpx;
				background: #e5e5e5;
				color: #999;
			}
			.content{
				flex: 1;
				height: 100%;
				.title {
					height: 60%;
					font-size: 16px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					cursor: pointer;
				}
				.count {
					width: 60rpx;
					text-align: center;
				}
			}
			.last-reply {
				position: absolute;
				bottom: 15rpx;
				right: 15rpx;
				color: #999;
			}
		}
	}
	.no-data{
		text-align: center;
		view{
			margin-top: 300rpx;
		}
	}
</style>
