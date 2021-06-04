<template>
  <div class="collection-wrapper">
    <div class="collection">

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
      pageSize: 20,
      pageIndex: 1,

    };
  },
  mounted(){
    this.getData();
  },
  methods: {
    getData(){
      const params ={
        tab: this.tabs[this.selectIndex].value,
        page: this.pageIndex,
        limit: this.pageSize,
      }
      this.$http.get(urlObj.getTopic(params)).then(res=>{
        if(res.data){
          this.list = res.data
        }
      })
    },
  },
  components: {

  },
}

</script>
<style lang='less' scoped>
</style>