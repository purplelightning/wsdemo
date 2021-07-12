<template>
	<view class="content">
		<drawer @close="setFlag(false)" :showFlag="flag"></drawer>
	</view>
</template>

<script>
	import drawer from '../drawer/drawer.vue'
	
	export default {
		data() {
			return {
				flag: false,
			}
		},
		onLoad() {

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
			drawer
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

</style>
