<template>
  <div id="home">
    <div class="right-mol" v-show="token">
      <info></info>
    </div>
    <div class="tab-container">
      <div :class="{active: index === selectIndex}" :key="index" v-for="(item,index) in tabs"
      class="tab" @click="changeList(index)">
        {{item.name}}
      </div>
    </div>
    <topic-list :bolist="list"></topic-list>
    <el-pagination
      background
      layout="prev, pager, next, sizes, jumper"
      :pager-count="5"
      :page-sizes="[10,15,20,30]"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :total="500">
    </el-pagination>
  </div>
</template>

<script>
import TopicList from 'components/TopicList'
import Info from 'components/Info'
import api from '@/requests/api'

import { mapState } from "vuex";

export default {
  data() {
    return{
      selectIndex: 5,
      tabs:[
        { name: '全部', value: 'all'},
        { name: '精华', value: 'good'},
        { name: '分享', value: 'share'},
        { name: '问答', value: 'ask'},
        { name: '招聘', value: 'job'},
        { name: '客户端测试', value: 'dev'},
      ],
      list: [],
      pageSize: 10,
      pageIndex: 1,
    }
  },
  created(){
    this.getData()
  },
  computed:{
    ...mapState(['token'])
  },
  methods:{
    handlePageChange(page){
      this.pageIndex=page
      this.getData()
    },
    handleSizeChange(size){
      this.pageSize=size
      this.getData()
    },
    getData(){
      const params ={
        tab: this.tabs[this.selectIndex].value,
        page: this.pageIndex,
        limit: this.pageSize,
      }
      api.getTopic(params).then(res=>{
        if(res.data){
          this.list = res.data
        }
      })
    },
    changeList(val){
      this.selectIndex = val
      this.getData()
    },
  },
  components:{
    TopicList,Info
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
    width: 220px;
    height: 200px;
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
  .el-pagination{
    margin-top: 10px;
    text-align: right;
  }
}
</style>
