<template>
	<view class="list-wrapper">
		<uni-list class="list">
			<view v-for="(item, index) in bolist" :key="" class="item" title="">
				<img class="user-avatar" :src="item.author&&item.author.avatarUrl">
				<view class="name">{{item.top ? '置顶' : tabObj[item.tab]}}</view>
				<view class="content">
					<view class="title" @click="goDetail(item._id)">{{item.title}}</view>
					<view class="count">{{item.replyCount}}/{{item.visitCount}}</view>
				</view>
				<view class="last-reply" v-show="item.lastReplyAt">{{item.lastReplyAt | sliceTime}}</view>
			</view>
		</uni-list>
	</view>
</template>

<script>
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
			console.log(this.bolist);
		},
		onShow(){
			console.log('show')
		},
		methods: {
			goDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/Topic/TopicDetail/TopicDetail'
				});
				// this.$router.history.push('/topic/detail/'+ id)
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
			height: 100rpx;
			box-sizing: border-box;
			font-size: 12px;
			border-bottom: 1rpx solid #ccc;
			.user-avatar {
				width: 30rpx;
				height: 30rpx;
			}
			.name {
				position: relative;
				margin: 0 10rpx;
				top: -10rpx;
				display: inline-block;
				padding: 2rpx 4rpx;
				height: 20rpx;
				line-height: 20rpx;
				background: #e5e5e5;
				color: #999;
			}
			.content{
				display: inline-block;
				width: 400rpx;
				height: 100%;
				.title {
					height: 60%;
					font-size: 14px;
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
				bottom: 10rpx;
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
</style>
