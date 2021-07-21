<template>
	<view>
		<view class="title">添加话题</view>
		<!-- <view class="">管理话题</view> -->
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">发表板块</view>
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
				<view class="title">标题</view>
				<input class="uni-input" v-model="title" placeholder="请输入标题" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">内容</view>
				<input class="uni-input" type="textarea"
				 v-model="content" placeholder="请输入内容" />
			</view>
			<view class="uni-btn-v">
				<button @click="submit">发表</button>
				<button type="default" @click="reset">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: '',
				content: '',
				index: 0,
				selectedVal:'',
				tabs:[
					{ name: '分享', value: 'share'},
					{ name: '问答', value: 'ask'},
					{ name: '招聘', value: 'job'},
					{ name: '客户端测试', value: 'dev'},
				],
			};
		},
		methods:{
			radioChange(aa){
				this.selectedVal = aa.detail.value
			},
			submit(){
				const params = {
					title: this.title,
					tab: this.selectedVal,
					content: this.content,
					author: this.loginname,
					avatarImg: this.avatarImg
				};
				console.log(params);
			},
			reset(){
				console.log('reset');
			}
		},
		computed:{
			...mapState(['loginname', 'avatarImg'])
		},
		watch:{
			current(){
				console.log(current);
			}
		}
	}
</script>

<style lang="less">

</style>
