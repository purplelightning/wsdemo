<template>
	<view class="manage-topic">
		<ToastMP></ToastMP>
		<view class="title">添加话题</view>
		<!-- <view class="">管理话题</view> -->
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="name">发表板块</view>
				<view class="">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in tabs" :key="item.value">
							<view>{{item.name}}</view>
							<view>
								<radio :value="item.value" @change="radioChange(item.value)" :checked="item.value === selectedVal" />
							</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="name">标题</view>
				<input class="uni-input" v-model="title" placeholder="请输入标题" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="name">内容</view>
				<input class="uni-input" type="textarea"
				 v-model="content" placeholder="请输入内容" />
			</view>
			<view class="uni-btn-v">
				<button type="primary" @click="submit">发表</button>
				<button type="default" @click="reset">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { baseUrl } from '../../../common/util.js'

	export default {
		data() {
			return {
				title: '',
				content: '',
				index: 0,
				selectedVal:'dev',
				tabs:[
					{ name: '分享', value: 'share'},
					{ name: '问答', value: 'ask'},
					{ name: '招聘', value: 'job'},
					{ name: '客户端测试', value: 'dev'},
				],
			};
		},
		methods:{
			...mapMutations(['logout']),
			radioChange(aa){
				this.selectedVal = aa.detail.value
			},
			submit(){
				if(!this.title||!this.content){
					this.$toast({msg:'请填写完内容', type:'error'})
					return
				}
				const params = {
					title: this.title,
					tab: this.selectedVal,
					content: this.content,
					author: this.loginname,
					avatarImg: this.avatarImg
				};
				uni.request({
					url: baseUrl + '/topic/addTopic',
					method: 'POST',
					data: params,
					header: {'Authorization': this.token},
					success: res => {
						let data = res.data
						if(data.status){
							this.$toast('话题添加成功')
							this.title = ''
							this.content = ''
							this.selectedVal = 'dev'
							uni.navigateTo({
								url: '/pages/index/index'
							})
						}else{
							this.$toast({msg: data.error, type:'error'})
							if(res.statusCode === 403 || res.statusCode === 401){
								this.logout()
								uni.navigateTo({
									url: '/pages/login/Login'
								})
							}
						}
					},
				});
			},
			reset(){
				this.title = ''
				this.content = ''
				this.selectedVal = 'dev'
			}
		},
		computed:{
			...mapState(['loginname', 'avatarImg', 'token'])
		},
		watch:{
			current(){
				console.log(current);
			}
		}
	}
</script>

<style lang="less">
.manage-topic{
	.title{
		text-align: center;
	}
	.uni-form-item{
		margin-bottom: 20rpx;
	}
}
</style>
