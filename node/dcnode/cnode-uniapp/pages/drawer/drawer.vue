<template>
	<view>
		<uni-drawer @change="handleChange" :visible="true" ref="drawer" mode="left" :width="300">
			<image :src="imgUrl" class="top" style="float: left; width:100%;height: 20%">
			<Info></Info>
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
	import imgUrl from '../../static/sea.png'

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
				imgUrl: imgUrl
			}
		},
		mounted(){
			// #ifdef MP
				this.tabs = [
					{ name: '全部', value: 'all'},
					{ name: '精华', value: 'good'},
					{ name: '分享', value: 'share'},
					{ name: '问答', value: 'ask'},
					{ name: '招聘', value: 'job'},
					{ name: '客户端测试', value: 'dev'},
					{ name: '设置', value: 'setting'},
					{ name: '退出登录', value: 'logout'},
				]
			// #endif
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
				}else if(item.value === 'setting'){
					uni.navigateTo({
						url: '/pages/about/about'
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
	.bottom{
		background-color: #FFF;
	}
.item{
	padding-left: 150rpx;
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid black;
	&.active{
		color: #FFF;
		background-color: #CCCCCC;
	}
}
</style>
