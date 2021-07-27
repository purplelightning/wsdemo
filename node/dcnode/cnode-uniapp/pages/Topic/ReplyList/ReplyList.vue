<template>
	<view class="list">
		 <view class="item" :key="index" v-for="(item,index) in levelList">
			<view class="primary">
				<img class="user-avatar" :src="item.author && item.author.avatarImg" />
				<view class="main">
					<text class="name">{{ item.author && item.author.name}}</text>
					<text class="des">{{index+1}}楼&nbsp;{{item.createTime | sliceTime}}</text>
					<view class="content">{{item.content}}</view>
				</view>
				<view class="fav"><uni-icons type="hand-thumbsup"></uni-icons>{{item.ups && item.ups.length}}</view>
				<view class="icon" v-show="token&&!replyId||replyId !== item.id" @click="openReply(item.id, item.author.name)">
					<uni-icons type="chat"></uni-icons></view>
				<view class="icon" v-show="token&&replyId&&replyId === item.id" @click="closeReply">收起回复</view>
			</view>
			<view class="sub-list" v-show="item.additionArr">
				<view class="primary sub-item" :key="index1" v-for="(tt, index1) in item.additionArr">
					<img class="user-avatar" :src="tt.author.avatarImg" />
					<view class="main">
						<text class="name">{{tt.author.name}}</text>
						<text class="des">{{tt.createTime | sliceTime}}</text>
						<view class="content">{{tt.content}}</view>
					</view>
					<view class="fav"><uni-icons type="hand-thumbsup"></uni-icons>{{tt.ups && tt.ups.length}}</view>
					<view class="chat" v-show="token&&!replyId||replyId !== tt.id" @click="openReply(tt.id, tt.author.name)"><uni-icons type="chat"></uni-icons></view>
					<view class="icon" v-show="token&&replyId&&replyId === tt.id" @click="closeReply">收起回复</view>
				</view>
			</view>
		</view>
		<view class="add-reply" v-show="replyId">
			<input v-model="replyContent"></input>
			<button size="mini" type="primary" @click="addReply">回复</button>
		</view>
	</view>
</template>

<script>
	import { addReply } from '../../../api/index.js'
	import { mapState } from 'vuex'
	
	export default {
		props: ['replyList', 'topicId'],
		data() {
			return {
				replyId: '',
				replyContent: '',
			};
		},
		methods:{
			openReply(id, name){
				this.replyId = id
				this.replyContent = '@' + name + ' '
			},
			closeReply(){
				this.replyId = ''
				this.replyContent = ''
			},
			addReply(){
				const params ={
					id: this.topicId,
					content: this.replyContent,
					author: {
						name: this.loginname,
						avatarImg: this.avatarImg
					},
					replyId: this.replyId
				}
				this.$http.post(addReply, params).then(res => {
					if(res.status){
						this.$toast('回复成功~')
						this.$emit('addReply')
						this.replyContent = ''
						this.replyId = ''
					}
				})
			},
		},
		computed:{
			...mapState(['token', 'loginname', 'avatarImg']),
			levelList(){
				if(this.replyList){
					let arr = this.replyList.filter(v=>v.replyId === '')
					let brr = this.replyList.filter(v=>v.replyId !== '')
					for(let i of arr){
						for(let j of brr){
							if(j.replyId === i.id){
								j.getHandled = true
								if(i.additionArr){
									i.additionArr.push(j)
								}else{
									i.additionArr = []
									i.additionArr.push(j)
								}
							}
						}
					}
					arr = arr.concat(brr.filter(v=>v.getHandled === undefined))
					return arr
				}
				return []
			}
		},
		filters:{
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
.list{
    .item{
			margin-bottom: 10rpx;
      width: 100%;
      padding: 10rpx;
      box-sizing: border-box;
      .primary{
        display: flex;
        position: relative;
        min-height: 100rpx;
        line-height: 50rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        border-top:1rpx solid #ccc;
        .user-avatar{
          flex: 0 0 80rpx;
          width: 80rpx;
          height: 80rpx;
          position: relative;
          top: 20rpx;
					border-radius: 8rpx;
        }
        .main{
          display: inline-block;
          flex: 1;
          width: 300rpx;
          padding-left: 10rpx;
          .name{
            margin-right: 6rpx;
            width: 100rpx;
            color: #666;
						font-weight: 700;
          }
          .des{
            color: #515df2;
          }
        }
        .fav{
          flex: 0 0 40rpx;
          line-height: 100rpx;
          i{
            margin-right: 10rpx;
          }
        }
        .chat, .icon{
          display: inline-block;
          margin-right: 20rpx;
					padding-left: 10rpx;
          line-height: 100rpx;
          cursor: pointer;
        }
      }
    }
  }
  .sub-list{
		margin-top: 10rpx;
		padding-left: 30rpx;
    width: calc(100% - 30rpx);
		
    .sub-item{
      min-height: 100rpx !important;
      background: #fafafa;
      border: none !important;
			
      .user-avatar{
        flex: 0 0 60rpx !important;
        width: 60rpx !important;
        height: 60rpx !important;
      }
      .main{
        width: 200rpx !important;
				font-size: 24rpx;
        .content{
          margin-top: -15rpx;
          width: 95%;
          min-height: 30rpx;
        }
      }
    }
  }
  .add-reply{
		margin-bottom: 100rpx;
    padding: 10rpx 15rpx;
    button{
      float: right;
      margin-top: 5rpx;
      margin-bottom: 5rpx;
    }
  }
	uni-button{
		float: right;
		width: 150rpx;
	}
</style>
