<template>
	<view class="collection">
		<view class="count">共{{total}}条</view>
		<topic-list :bolist="originList" :favFlag="true"></topic-list>
	</view>
</template>

<script>
	import TopicList from '../Topic/TopicList/TopicList.vue'
	import { mapState } from 'vuex'
	import { getTopicCollections } from '../../api/index.js'
	
	export default {
		data() {
			return {
				originList: [],
				total: 0,
			};
		},
		onShow(){
			this.getData()
		},
		methods:{
			getData(){
				this.$http.get(getTopicCollections).then(res=>{
					if(res.data){
						this.originList = res.data.map(v=>{
							return {
								_id: v.collectTopicId,
								title: v.topicTitle,
								author: v.author
							}
						})
						this.total = this.originList.length
					}
				})
			},
		},
		computed:{
			...mapState(['loginname'])
		},
		components:{
			TopicList
		}
	}
</script>

<style lang="less" scoped>
	.count{
		margin: 20rpx 0;
		width: 100%;
		text-align: center;
	}
</style>
