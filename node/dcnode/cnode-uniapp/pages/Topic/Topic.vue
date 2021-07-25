<template>
	<view class="topic-wrapper">
		<topic-list :bolist="list"></topic-list>
		<ToastMP></ToastMP>
	</view>
</template>
<script>
import TopicList from './TopicList/TopicList.vue'
import { mapState } from 'vuex'
import { topicList } from '../../api/index.js'

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
					page: this.pageIndex || 1,
					pageSize: this.pageSize || 20,
				}
				this.$http.get(topicList, params).then(res=>{
					let result = res.data
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
