<template>
  <div class="home">
    <h2>电子发票处理</h2>
    <div class="des">
      <p>单张PDF发票输入姓名，修改为：发票代码_发票号码_姓名</p>
      <p>ZIP压缩包批量重命名</p>
    </div>
    <button id="open-out" class="btn" @click="open">输出目录</button>
    <button id="delete-out" class="btn" @click="deleteOutput">清空输出目录</button>
    <Info/>
  </div>
</template>

<script setup name="HomeView">
import Info from "@/components/Info.vue";

const open = () => {
  console.log("oepn");
};

const deleteOutput = () => {
  console.log("delete");
};
</script>
<style lang="less" scoped>
.home {
  position: relative;
  .des{
    margin: 30px 0;
  }
}
h2 {
  width: 100%;
  text-align: center;
  color: #999;
}
.btn {
  position: absolute;
  top: 80px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    font-size: 15px;
    text-shadow: 1px 1px 1px blue;
  }
}
#open-out {
  right: 150px;
  background: #33aa33;
}
#delete-out {
  right: 10px;
  background: #dd3333;
}
</style>
