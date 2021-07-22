<template>
	<view class="usercenter">
		<ToastMP></ToastMP>
		<image :src="avatarImg" style="width: 80px;height: 80px;"></image>
		<uni-file-picker
			ref="files"
			v-model="imageValue"
			file-mediatype="image"
			@select="select"
			:limit="1"
			>修改头像</uni-file-picker>
			<button class="btn" @click="upload">上传图片</button>
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
						this.setAvatar(JSON.parse(res.data).data)
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
				
				
			}
		},
		computed:{
			...mapState(['avatarImg', 'token']),
		}
	}
</script>

<style lang="less">
.btn{
	display: inline-block;
}
</style>
