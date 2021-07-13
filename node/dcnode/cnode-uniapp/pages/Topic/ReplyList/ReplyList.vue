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
				<!-- <i class="el-icon-chat-dot-round icon" v-show="token&&!replyId||replyId !== item.id" @click="openReply(item.id, item.author.name)"></i> -->
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
					<!-- <i class="el-icon-chat-dot-round icon" v-show="token&&!replyId||replyId !== tt.id" @click="openReply(tt.id, tt.author.name)"></i> -->
					<view class="icon" v-show="token&&replyId&&replyId === tt.id" @click="closeReply">收起回复</view>
				</view>
			</view>
		</view>
		<view class="add-reply" v-show="replyId">
			<input type="textarea" rows="4" v-model="replyContent"></input>
			<button type="primary" @click="addReply">回复</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['replyList', 'topicId'],
		data() {
			return {
				token:'aaa',
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
				// api.addReply(params).then( res => {
				// 	if(res.status){
				// 		this.$message.success('回复成功~')
				// 		this.$emit('addReply')
				// 		this.replyContent = ''
				// 		this.replyId = ''
				// 	}
				// })
			},
		},
		computed:{
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
		}
	}
</script>

<style lang="less">
.list{
    .item{
      width: 100%;
      padding: 10rpx;
      box-sizing: border-box;
      .primary{
        display: flex;
        position: relative;
        height: 60rpx;
        line-height: 30rpx;
        box-sizing: border-box;
        font-size: 12rpx;
        border-top:1rpx solid #ccc;
        .user-avatar{
          flex: 0 0 40rpx;
          width: 40rpx;
          height: 40rpx;
          position: relative;
          top: 10rpx;
        }
        .main{
          display: inline-block;
          flex: 1;
          width: 300rpx;
          padding-left: 10rpx;
          .name{
            margin-right: 3rpx;
            width: 100rpx;
            color: #666;
          }
          .des{
            color: #515df2;
          }
        }
        .fav{
          flex: 0 0 40rpx;
          line-height: 60rpx;
          i{
            margin-right: 5rpx;
          }
        }
        .icon{
          display: inline-block;
          margin-right: 10rpx;
          line-height: 60rpx;
          cursor: pointer;
        }
      }
    }
  }
  .sub-list{
    width: calc(100% - 30rpx);
    padding-left: 30rpx;
    .sub-item{
      margin-bottom: 2rpx;
      height: 50rpx !important;
      background: #fafafa;
      border: none !important;
      .user-avatar{
        flex: 0 0 30rpx !important;
        width: 30rpx !important;
        height: 30rpx !important;
      }
      .main{
        width: 200rpx !important;
        .content{
          margin-top: -15rpx;
          width: 50%;
          height: 30rpx;
        }
      }
    }
  }
  .add-reply{
    padding: 10rpx 15rpx;
    button{
      float: right;
      margin-top: 5rpx;
      margin-bottom: 5rpx;
    }
  }
</style>
