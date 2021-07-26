<template>
	<view class="manage-topic">
		<ToastMP></ToastMP>
		<view class="title" v-show="type==='add'">添加话题</view>
		<view class="title" v-show="type==='edit'">编辑话题</view>
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="name">发表板块</view>
				<view class="">
					<radio-group @change="radioChange" :class="{'no-edit': type==='edit'}">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in tabs" :key="item.value">
							<view class="name">{{item.name}}</view>
							<view class="rd-item">
								<radio :disabled="type==='edit'" :value="item.value" @change="radioChange(item.value)" :checked="item.value === selectedVal" />
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
	import { addTopic, updateTopic } from '../../../api/index.js'
	
	export default {
		data() {
			return {
				topicId: '',
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
				type: '',
			};
		},
		onLoad(option){
			this.type = option.type
			if(this.type === 'edit'){
				const eventChannel = this.getOpenerEventChannel()
				// 这里this.title赋值不起作用，因为this指向了函数，需要用箭头函数
				// eventChannel.on('editPage', function(data) {
				eventChannel.on('editPage', data => {
					this.title = data.ftitle
					this.content = data.fcontent
					this.topicId = data.topicId
					this.selectedVal = data.tab
				})
			}
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
				if(this.type === 'add'){
					this.$http.post(addTopic, params).then(res=>{
						if(res.status){
							this.$toast('话题添加成功')
							this.title = ''
							this.content = ''
							this.selectedVal = 'dev'
							uni.switchTab({
								url: '/pages/index/index'
							})
						}else{
							this.$toast({msg: res.error, type:'error'})
						}
					});
				}else{
					params.id = this.topicId
					delete params.author
					delete params.avatarImg
					this.$http.post(updateTopic, params).then(res=>{
						if(res.status){
							this.$toast('话题修改成功')
							this.title = ''
							this.content = ''
							this.selectedVal = 'dev'
							this.topicId = ''
							uni.switchTab({
								url: '/pages/index/index'
							})
						}else{
							this.$toast({msg: res.error, type:'error'})
						}
					});
				}
				
			},
			reset(){
				this.title = ''
				this.content = ''
				this.selectedVal = 'dev'
			}
		},
		computed:{
			...mapState(['loginname', 'avatarImg', 'token']),
		},
		watch:{
			current(){
				console.log(current);
			}
		}
	}
</script>

<style lang="less" scoped>
.manage-topic{
	.title{
		font-size: 40rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}
	.uni-form-item{
		margin-bottom: 20rpx;
		uni-radio-group{
			padding: 20rpx 0;
			display: flex;
			justify-content: space-around;
			.uni-list-cell{
				.name{
					display: inline-block;
				}
				.rd-item{
					display: inline-block;
				}
			}
		}
		.no-edit{
			background-color: #bbb;
		}
		
	}
}
</style>
