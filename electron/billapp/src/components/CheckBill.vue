<template>
  <div class="about">
    <div class="item">
      <span class="des">单张发票校验</span>
      <div class="upload-wrapper">
        <p>选择文件/拖拽到此处</p>
        <input
          class="upload-file"
          ref="pdobj"
          type="file"
          accept=".pdf"
          @change="selectPdf('pdfCheck')"
        />
      </div>
      <div class="file-name">{{ state.pname }}</div>
    </div>
    <div class="item">
      <span class="des">发票压缩包校验<br />(zip格式，需要不带目录压缩)</span>
      <div class="upload-wrapper">
        <p>选择文件/拖拽到此处</p>
        <input
          class="upload-file"
          ref="ziobj"
          type="file"
          accept=".zip"
          @change="handleZip"
        />
      </div>
      <div class="file-name">{{ state.zname }}</div>
    </div>
    <section ref="check-container" id="check-container"></section>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, onBeforeUnmount } from "vue";
import { handleSingle, handleMultiple } from "./info";

const state = reactive({
  pname: "",
  zname: "",
});

const pdobj = ref(null);
const ziobj = ref(null);

const selectPdf = (type) => {
  let dom = null;
  if (type === "pdfCheck") {
    dom = pdobj.value;
  }
  const file = dom.files[0];
  state.pname = file.name
  let filePath = file.path;
  let fileName = file.name;
  handleSingle(
    filePath,
    fileName,
    file.name,
    "pdfCheck"
  );
};

const handleZip = () => {
  const dom = ziobj.value
  const file = dom.files[0]
  state.zname = file.name
  let filePath = file.path;
  let fileName = file.name;
  handleMultiple(filePath, fileName, file.name, 'zipCheck')
};

const setDragOverColor = (e) => {
  e.preventDefault();
  e.stopPropagation();
  let pDom = e.target.previousSibling;
  pDom.style.boxShadow = "5px 5px 5px #00bccc";
};
const removeDragOverColor = (e) => {
  e.preventDefault();
  e.stopPropagation();
  let pDom = e.target.previousSibling;
  pDom.style.boxShadow = "";
};
const stop = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const sendDragFile = (e, type) => {
  e.preventDefault();
  e.stopPropagation();

  const files = e.dataTransfer.files;
  if (files.length) {
    const file = files[0];
    let filePath = file.path;
    const fileName = file.name;
    if (type === "pdfCheck") {
      state.pname = file.name;
      handleSingle(filePath, fileName, file.name, type);
    }else if(type=== 'zipCheck'){
      state.zname = file.name
      handleMultiple(filePath, fileName, file.name, 'zipCheck')
    }
  }
};

const bindListener = (obj) => {
  obj.value.addEventListener("dragenter", setDragOverColor);
  obj.value.addEventListener("dragleave", removeDragOverColor);
  obj.value.addEventListener("drop", removeDragOverColor);
  obj.value.addEventListener("dragover", stop);
};

onMounted(() => {
  bindListener(pdobj);
  bindListener(ziobj);
  pdobj.value.addEventListener("drop", (e) => sendDragFile(e, "pdfCheck"));
  ziobj.value.addEventListener("drop", (e) => sendDragFile(e, "zipCheck"));
});
</script>
<style scoped lang="less">
.about {
  min-width: 600px;
  min-height: 600px;
  .item {
    position: relative;
    margin-top: 50px;
    margin-bottom: 20px;
    padding: 20px 15px;
    border: 1px solid #ccc;
    .des {
      vertical-align: middle;
      display: inline-block;
      width: 220px;
    }
    .upload-wrapper {
      display: inline-block;
      position: relative;
      width: 150px;
      text-align: center;
      border-radius: 5px;
      &:hover {
        p {
          box-shadow: 5px 5px 5px #00bccc;
        }
      }
      p {
        z-index: 0;
        width: 100%;
        padding: 20px 0;
        background: #fff;
        border: 3px solid #00bfff;
        color: #00bfff;
        font-size: 14px;
        border-radius: 5px;
      }
      .upload-file {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        /*透明度为0*/
        opacity: 0;
        cursor: pointer;
      }
    }
    .file-name {
      position: absolute;
      top: 40px;
      left: 400px;
      width: 400px;
      height: 24px;
      font-size: 14px;
      text-align: left;
      color: #00bfff;
    }
  }
  .play{
    vertical-align: top;
  }
  #zipDis {
    margin-top: 10px;
    float: right;
    margin-right: 20px;
    width: 460px;
    height: 120px;
    word-wrap: break-word;
  }
  #circle {
    margin-top: 10px;
    margin-left: 200px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: conic-gradient(#11f5e2fd 0, #11f5e2fd 0, #b3b2ff 0, #b3b2ff);
    -webkit-mask: radial-gradient(
      transparent,
      transparent 50%,
      #000 50%,
      #000 0
    );
  }
  #check-container{
    div{
      margin-bottom: 5px;
    }
  }
}
</style>
