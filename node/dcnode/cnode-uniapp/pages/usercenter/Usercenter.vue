<template>
	<view class="usercenter">
		<ToastMP></ToastMP>
		<view class="name item">用户：{{loginname}}</view>
		<view class="phone item">手机：{{phone}}</view>
		<view class="item img">
			<text>头像：</text>
			<image :src="avatarImg" style="width: 60px;height: 60px;"></image>
			<uni-file-picker
				ref="files"
				v-model="imageValue"
				file-mediatype="image"
				@select="select"
				:limit="1"
				>修改头像</uni-file-picker>
				<button size="mini" class="btn" @click="upload">上传图片</button>
		</view>
		<view class="collection item" @click="goCollection">我的收藏</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { baseUrl } from '../../common/util.js'
	
	export default {
		data() {
			return {
				
				imageValue:[],
				file: ''
			};
		},
		methods:{
			...mapMutations(['setAvatar']),
			select(e){
				if(!e.tempFiles[0] || !e.tempFiles[0].file){
					this.$toast({msg:'请选择图片', type:'error'})
					return
				}
				let tmp = e.tempFiles
				this.file = tmp
			},
			upload(){ // 上传头像，改了好多遍。。
				let tmp = this.file
				tmp[0].name = 'avatar'//后端处理的key
				delete tmp.uuid
				delete tmp.cloudPath
				console.log(this.file[0]);

				// #ifdef MP
				wx.uploadFile({
					url: baseUrl + `/user/uploadAvatar`,
					filePath: this.file[0].path,
					name: 'avatar',
					header: {'Authorization': this.token},
					success:res=>{
						this.setAvatar(baseUrl + JSON.parse(res.data).data)
						this.$toast('头像修改成功')
					}
				})
				// #endif
				// #ifndef MP
				uni.uploadFile({ //
					url: baseUrl + `/user/uploadAvatar`,
					files: tmp,
					header: {'Authorization': this.token},
					success: (res) => {
						this.setAvatar(baseUrl + JSON.parse(res.data).data)
						this.$toast('头像修改成功')
					}
				});
				// #endif
			},
			goCollection(){
				uni.navigateTo({
					url: '/pages/Collection/Collection'
				})
			}
		},
		computed:{
			...mapState(['avatarImg', 'loginname', 'phone', 'token']),
		}
	}
</script>

<style lang="less">
	.item{
		padding: 20rpx 20rpx;
		border-bottom: 1px solid #ccc;
	}
	.img{
		position: relative;
		height: 80px;
		text{
			margin-top: 10px;
			float: left;
		}
		.uni-file-picker{
			margin-top: -66px;
			margin-left: 120px;
			width: 220px;
		}
		.btn{
			float: right;
			margin-right: 100rpx;
			margin-top: -100rpx;
			width: 100px;
		}
	}
	
	
</style>
