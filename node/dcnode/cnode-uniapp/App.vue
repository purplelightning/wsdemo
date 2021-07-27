<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	uni-button{
		margin: 10px auto;
		width: 500rpx;
	}
	uni-input{
		margin-bottom: 10rpx;
		border-bottom: 1px solid #ccc;
	}
</style>
