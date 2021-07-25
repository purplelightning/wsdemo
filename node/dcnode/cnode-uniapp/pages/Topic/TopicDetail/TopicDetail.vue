<template>
	<scroll-view class="detail-wrapper">
		<view class="btns">
			<uni-icons v-show="!info.isCollected && token" type="star"  @click="handleFav()"></uni-icons>
			<uni-icons v-show="info.isCollected && token" type="star-filled"  @click="handleFav()"></uni-icons>
			<uni-icons type="compose" v-show="info.author && info.author.name===loginname" @click="editTopic"></uni-icons>
			<uni-icons v-show="info.author && info.author.name===loginname" type="trash"  @click="deleteTopic"></uni-icons>
		</view>
		<view class="detail">
			<view class="title">{{info.title}}</view>
			<view class="des">
				<view class="item"><uni-icons type="paperplane"></uni-icons>{{info.createTime | sliceTime}}</view>
				<view class="item"><uni-icons type="person"></uni-icons>&nbsp;{{info.author && info.author.name}}</view>
				<view class="item"><uni-icons type="eye"></uni-icons>{{info.visitCount}}</view>
			</view>
			<view v-html="info.content"></view>
		</view>
		<view class="reply">
			<view class="reply-head">{{info.replyCount}}回复</view>
			<reply-list v-show="info.replyList" :topicId="info._id" :replyList="info.replyList"
			@addReply="getDetailInfo"></reply-list>
			<!-- <view class="add-reply" v-show="token">
				<input type="textarea" rows="4" v-model="replyContent"></el-input>
				<button type="primary" @click="addReply">回复</button>
			</view> -->
		 </view>
		 <ToastMP></ToastMP>
	</scroll-view>
</template>

<script>
	import { topicDetail, deleteTopic } from '../../../api/index.js'
	import ReplyList from '../ReplyList/ReplyList.vue'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				token:'aaa',
				info: {},
				replyContent: '',
			};
		},
		onLoad(option){
			this.getDetailInfo(option.id);
		},
		methods:{
			getDetailInfo(id){
				if (!id) {
					return;
				}
				const params = {
					id: id
				}
				this.$http.get(topicDetail, params).then(res=>{
					if(res.data){
						this.info = res.data;
					}
				});
			},
			editTopic(){
				const params = {
					type: 'edit',
					ftitle: this.info.title,
					fcontent: this.info.content,
					topicId: this.info._id,
					tab: this.info.tab
				}
				// 路由传参写法
				uni.navigateTo({
					url: '../ManageTopic/ManageTopic?type=edit',
					success: res=>{
						res.eventChannel.emit('editPage', params)
					}
				})
			},
			deleteTopic(){
				this.$http.post(deleteTopic, {id: this.info._id}).then(res=>{
					if(res.status){
						this.$toast(res.data)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						}, 1500)
					}else{
						this.$toast({msg: res.error, type:'error'})
					}
				})
			}
		},
		filters:{
			sliceTime(time){
				if(time){
					return time.split(' ')[0].slice(5,10)
				}
				return ''
			}
		},
		computed:{
			...mapState(['loginname'])
		},
		components:{
			ReplyList
		}
	}
</script>

<style lang="less">
.detail-wrapper {
  position: relative;
  .btns{
    position: absolute;
		top: 10rpx;
		right: 50rpx;
		.uni-icons{
			margin-left: 20rpx;
		}
  }
  .detail{
    margin: 20rpx 30rpx 0 30rpx;
    padding: 0 15rpx;
    min-height: 400rpx;
    background: #fff;
    box-sizing: border-box;
    .title{
      font-size: 36rpx;
      font-weight: 700;
    }
    .des{
			margin: 15rpx 0;
			width: 100%;
			display: flex;
      font-size: 28rpx;
      color: #838383;
      border-bottom: 1rpx solid #ccc;
			.item{
				flex: 1;
			}
    }
  }
  .reply{
    margin: 15rpx 30rpx;
    height: 300rpx;
    background: #fff;
    box-sizing: border-box;
    .reply-head{
      width: 100%;
			padding-left: 10px;
      height: 80rpx;
      line-height: 80rpx;
      background: #f6f6f6;
    }
    .add-reply{
      height: 200rpx;
      .el-textarea{
        margin-bottom: 20rpx;
      }
    }
  }
}
</style>
