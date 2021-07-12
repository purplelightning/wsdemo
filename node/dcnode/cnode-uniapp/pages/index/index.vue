<template>
	<view class="content">
		<drawer @close="setFlag(false)" :showFlag="flag"></drawer>
		<topic></topic>
	</view>
</template>

<script>
	import drawer from '../drawer/drawer.vue'
	import Topic from '../Topic/Topic.vue'
	
	export default {
		data() {
			return {
				flag: false,
				show:false
			}
		},
		onNavigationBarButtonTap(e){
			if(e.float === 'left'){
				this.setFlag(true)
			}else{
				uni.navigateTo({
					url: '/pages/about/about'
				});
			}
		},
		methods: {
			setFlag(val){
				this.flag = val
			},
		},
		components:{
			drawer,
			Topic
		}
	}
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

</style>
