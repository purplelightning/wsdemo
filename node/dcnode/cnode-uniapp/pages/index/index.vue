<template>
	<view class="content">
		<uni-nav-bar
			:title="selectedTab.name"
			leftIcon="bars"
			@clickLeft="setFlag(true)"
			rightIcon="gear"
			@clickRight="goSetting"
			color="#000"
			backgroundColor="#fff"
			fixed="true"
			statusBar="true"
		></uni-nav-bar>
		<drawer @close="setFlag(false)" :showFlag="flag"></drawer>
		<topic :refreshDown="refreshDown" @refreshEnd="stopRefresh"
		:refreshUp="refreshUp" @refreshUpEnd="stopRefreshUp"></topic>
		<EloadingMP></EloadingMP>
	</view>
</template>

<script>
	import drawer from '../drawer/drawer.vue'
	import Topic from '../Topic/Topic.vue'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				flag: false,
				show: false,
				refreshDown: false,
				refreshUp: false
			}
		},
		onPullDownRefresh(){
			this.refreshDown = true
		},
		onReachBottom(){
			this.$loading(true)
			this.refreshUp = true
			console.log('reach');
		},
		// onNavigationBarButtonTap(e){
		// 	if(e.float === 'left'){
		// 		this.setFlag(true)
		// 	}else{
		// 		uni.navigateTo({
		// 			url: '/pages/about/about'
		// 		});
		// 	}
		// },
		methods: {
			setFlag(val){
				this.flag = val
			},
			stopRefresh(){
				this.refreshDown = false
				uni.stopPullDownRefresh()
			},
			stopRefreshUp(){
				this.refreshUp = false
				setTimeout(()=>{
					this.$loading(false)
				}, 500)
			},
			goSetting(e){
				uni.navigateTo({
					url: '/pages/usercenter/Usercenter'
				});
			},
		},
		computed:{
			...mapState(['selectedTab'])
		},
		components:{
			drawer,
			Topic
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

</style>
