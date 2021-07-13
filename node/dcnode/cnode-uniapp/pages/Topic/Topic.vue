<template>
	<view class="topic-wrapper">
		<topic-list :bolist="list"></topic-list>
	</view>
</template>
<script>
import TopicList from './TopicList/TopicList.vue'
import { mapState } from 'vuex'
import { baseUrl } from '../../common/util.js'

	export default {
		data() {
			return {
				list:[],
				pageIndex: 1,
				pageSize: 10,
			}
		},
		mounted(){
			this.getData()
		},
		methods: {
			getData(){
				const params = {
					tab: this.selectedTab.value,
					page: this.pageIndex,
					limit: this.pageSize,
				}
				uni.request({
					url: baseUrl + `/topic/list?tab=${params.tab}&page=${params.page ? params.page : 1}&pageSize=${params.limit ? params.limit : 20}`,
					data: {},
					success: res => {
						this.list = res.data.data
					}
				})
			}
		},
		computed:{
			...mapState(['selectedTab'])
		},
		components:{
			TopicList
		}
	}
</script>

<style lang="less">
.topic-wrapper{
	width: 750rpx;
}
</style>
