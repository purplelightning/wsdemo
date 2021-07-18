<template>
	<view class="topic-wrapper">
		<topic-list :bolist="list"></topic-list>
		<ToastMP></ToastMP>
	</view>
</template>
<script>
import TopicList from './TopicList/TopicList.vue'
import { mapState } from 'vuex'
import { baseUrl } from '../../common/util.js'

	export default {
		props:['refreshDown', 'refreshUp'],
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
		watch:{
			refreshDown(){
				if(this.refreshDown){
					this.getData()
				}
			},
			refreshUp(){
				if(this.refreshUp){
					this.pageIndex++
					this.getData(true)
				}
			},
			selectedTab(){
				this.getData()
			}
		},
		methods: {
			getData(flag){
				if(!flag){
					this.pageIndex = 1
				}
				const params = {
					tab: this.selectedTab.value,
					page: this.pageIndex,
					limit: this.pageSize,
				}
				uni.request({
					url: baseUrl + `/topic/list?tab=${params.tab}&page=${params.page ? params.page : 1}&pageSize=${params.limit ? params.limit : 20}`,
					data: {},
					success: res => {
						let result = res.data.data
						this.$toast('列表更新')
						if(flag){
							if(!result.length){
								this.pageIndex--
								this.$toast({msg: '没有更多数据', type:'info'})
							}
							this.list = this.list.concat(result)
							this.$emit('refreshUpEnd')
						}else{
							this.list = result
							this.$emit('refreshEnd')
						}
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
