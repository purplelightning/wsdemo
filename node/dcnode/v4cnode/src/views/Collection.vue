<template>
  <div class="collection-wrapper">
    <div class="title">我的收藏</div>
    <div class="collection">
      <topic-list :bolist="originList" :favFlag="true"></topic-list>
    </div>
  </div>
</template>
<script>
import TopicList from 'components/TopicList'
import api from '@/requests/api'

import { mapState } from "vuex";

export default {
  data () {
    return {
      pageSize: 10,
      pageIndex: 1,
      originList: [],
      total: 0,
    };
  },
  mounted(){
    this.getData();
  },
  methods: {
    getData(){
      api.getTopicCollections().then(res=>{
        if(res.data){
          this.originList = res.data.map(v=>{
            return {
              _id: v.collectTopicId,
              title: v.topicTitle,
              author: v.author
            }
          })
        }
      })
    },
  },
  computed:{
    ...mapState(['loginname'])
  },
  components: {
    TopicList
  },
}

</script>
<style lang='less' scoped>
.collection-wrapper{
  padding: 50px;
  .title{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .collection{
    border: 1px solid #ccc;
  }
}
</style>