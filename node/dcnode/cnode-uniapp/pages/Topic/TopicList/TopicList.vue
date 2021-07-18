<template>
	<scroll-view class="list-wrapper">
		<uni-list class="list" v-show="bolist.length">
			<view v-for="(item, index) in bolist" :key="index" class="item" title="">
				<img class="user-avatar" :src="item.author&&item.author.avatarUrl">
				<view class="name">{{item.top ? '置顶' : tabObj[item.tab]}}</view>
				<view class="content">
					<view class="title" @click="goDetail(item._id)">{{item.title}}</view>
					<view class="count">{{item.replyCount}}/{{item.visitCount}}</view>
				</view>
				<view class="last-reply" v-show="item.lastReplyAt">{{item.lastReplyAt | sliceTime}}</view>
			</view>
		</uni-list>
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
			padding: 10rpx;
			width: 100%;
			height: 150rpx;
			box-sizing: border-box;
			font-size: 12px;
			border-bottom: 1rpx solid #ccc;
			.user-avatar {
				width: 80rpx;
				height: 80rpx;
			}
			.name {
				position: relative;
				margin: 0 12rpx;
				top: -12rpx;
				display: inline-block;
				padding: 3rpx 6rpx;
				height: 30rpx;
				line-height: 30rpx;
				background: #e5e5e5;
				color: #999;
			}
			.content{
				display: inline-block;
				width: 400rpx;
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

	.fav {
		.user-avatar {
			margin-right: 20rpx;
		}
	}
	.no-data{
		text-align: center;
		view{
			margin-top: 300rpx;
		}
	}
</style>
