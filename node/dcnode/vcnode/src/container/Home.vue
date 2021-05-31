<template>
  <div id="home">
    <div class="right-mol">
      <el-button type="primary" @click="goCreate">发布话题</el-button>
    </div>
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
import bList from '../components/bList'
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
    },
    goCreate(){
      this.$router.history.push('/topic/create')
    }
  },
  components:{
    bList
  }
}
</script>

<style scoped lang="less">
#home{
  position: relative;
  padding: 20px 0 20px 40px;
  width: 750px;
  .right-mol{
    position: absolute;
    top: 20px;
    right: -300px;
    width: 200px;
    height: 200px;
    border: 1px solid black;
  }
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
