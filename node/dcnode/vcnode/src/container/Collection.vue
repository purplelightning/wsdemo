<template>
  <div class="collection-wrapper">
    <div class="title">我的收藏</div>
    <div class="collection">
      <topic-list :bolist="originList"></topic-list>
    </div>
  </div>
</template>
<script>
import TopicList from '../components/TopicList'
import urlObj from '../common/api'

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
      this.$http.get(urlObj.getTopicCollections(this.loginname)).then(res=>{
        if(res.data){
          this.originList = res.data
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