<template>
	<view>
		<uni-drawer  @change="handleChange" :visible="true" ref="drawer" mode="left" :width="300">
			<view class="top" style="height: 20%">
				<Info></Info>
			</view>
			<scroll-view class="bottom" style="height: 80%;" scroll-y="true">
				<view class="item" :class='{"active": item.name===selectedName}'
				@click="changeItem(item)" v-for="(item, index) in tabs" :key="index">{{ item.name }}</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import {
		mapState, mapMutations
	} from 'vuex'
	import Info from './Info.vue'

	export default {
		props:['showFlag'],
		data() {
			return {
				tabs:[
					{ name: '全部', value: 'all'},
					{ name: '精华', value: 'good'},
					{ name: '分享', value: 'share'},
					{ name: '问答', value: 'ask'},
					{ name: '招聘', value: 'job'},
					{ name: '客户端测试', value: 'dev'},
					{ name: '退出登录', value: 'logout'},
				],
			}
		},
		methods: {
			showDrawer() {
				this.$refs.drawer.open();
			},
			closeDrawer() {
				this.$refs.drawer.close();
			},
			handleChange(flag){
				if(!flag){
					this.$emit('close')
				}
			},
			changeItem(item){
				if(item.value === 'logout'){
					this.logout()
					uni.navigateTo({
						url: '/pages/login/Login'
					})
					return
				}
				this.changeTab(item)
				this.closeDrawer()
			},
			...mapMutations(['changeTab', 'logout'])
		},
		watch:{
			showFlag(){
				if(this.showFlag){
					this.showDrawer()
				}
			}
		},
		computed: {
			...mapState(['leftOpen', 'selectedTab']),
			selectedName(){
				return this.selectedTab.name
			}
		},
		components:{
			Info
		}
	}
</script>

<style lang="less" scoped>
	.top{
		background-image: url(../../static/sea.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.bottom{
		background-color: #FFF;
	}
.item{
	text-align: center;
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid black;
	&.active{
		color: #FFF;
		background-color: #CCCCCC;
	}
}
</style>
