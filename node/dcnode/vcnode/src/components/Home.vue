<template>
  <div id="home">
    <div class="tab-container">
      <div :class="{active: index === selectIndex}" :key="index" v-for="(item,index) in tabs"
      class="tab" @click="changeList(index)">
        {{item.name}}
      </div>
    </div>
    <b-list :bolist="list"></b-list>
  </div>
</template>

<script>
import bList from './bList'
import urlObj from '../common/api'

export default {
  data() {
    return{
      selectIndex: 0,
      tabs:[
        { name: '全部', value: 'all'},
        { name: '精华', value: 'good'},
        { name: '分享', value: 'share'},
        { name: '问答', value: 'ask'},
        { name: '招聘', value: 'job'},
        { name: '客户端测试', value: 'dev'},
      ],
      list: [],
      pageSize: 20,
      pageIndex: 1,
    }
  },
  created(){
    this.getData()
  },
  computed:{
    acClass(){

    }
  },
  methods:{
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
    changeList(val){
      this.selectIndex = val
      this.getData()
    }
  },
  components:{
    bList
  }
}
</script>

<style scoped lang="less">
#home{
  padding: 20px 50px;
  min-width: 700px;
  .tab-container{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f6f6f6;
    .tab{
      display: inline-block;
      margin: 0 10px;
      padding: 0 4px;
      line-height: 30px;
      color: #80bd01;
      border-radius: 3px;
      cursor: pointer;
    }
    .active{
      color: #fff;
      background: #80bd01;
    }
  }
}
</style>
