<template>
  <div id="info">
    <div class="top">
      <label>姓名：</label
      ><input
        id="name"
        v-model="user"
        type="text"
        placeholder="请输入姓名，否则以发票名/压缩包名命名"
      />
    </div>
    <div class="item">
      <span class="des">单张发票重命名</span>
      <div class="upload-wrapper">
        <p>选择文件/拖拽到此处</p>
        <input
          class="upload-file"
          ref="pdobj"
          type="file"
          accept=".pdf"
          @change="selectPdf('pdf')"
        />
      </div>
      <div class="file-name">{{ state.pname }}</div>
    </div>
    <div class="item">
      <span class="des">单张发票重命名生成Excel</span>
      <div class="upload-wrapper">
        <p>选择文件/拖拽到此处</p>
        <input
          class="upload-file"
          ref="exobj"
          type="file"
          accept=".pdf"
          @change="selectPdf('excel')"
        />
      </div>
      <div class="file-name">{{ state.ename }}</div>
    </div>
    <div class="item">
      <span class="des">发票压缩包处理<br />(zip格式，需要不带目录压缩)</span>
      <div class="upload-wrapper">
        <p>选择文件/拖拽到此处</p>
        <input
          class="upload-file"
          ref="ziobj"
          type="file"
          accept=".zip"
          @change="handleZip()"
        />
      </div>
      <div id="zip-display"></div>
      <div class="circle-progress"></div>
      <div class="line-progress"></div>
    </div>
    <section ref="container" id="container"></section>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted, reactive, ref } from "vue";

import { ipcRenderer } from "electron";

import { handleSingle } from "./info";

const props = defineProps({
  resetCount: {
    type: Number,
  },
});

const user = ref("");
const pdobj = ref(null);
const exobj = ref(null);
const ziobj = ref(null);

const state = reactive({
  pname: "",
  ename: "",
  zname: "",
});

const selectPdf = (type) => {
  let dom = null;
  if (type === "pdf") {
    dom = pdobj.value;
  } else if (type === "excel") {
    dom = exobj.value;
  }
  const file = dom.files[0];
  if (type === "pdf") {
      state.pname = file.name;
    } else {
      state.ename = file.name;
    }
  let filePath = file.path;
  let fileName = user.value || file.name;
  handleSingle(
    filePath,
    fileName,
    file.name,
    type === "pdf" ? "pdf" : "excel"
  );
};

const handleZip = () => {
  console.log("zip");
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
    if (type === "pdf") {
      state.pname = file.name;
    } else {
      state.ename = file.name;
    }

    let filePath = file.path;
    const fileName = user.value || file.name;
    handleSingle(filePath, fileName, file.name, type);
  }
};

const cleanState = () => {
  user.value = "";
  pdobj.value = null;
  exobj.value = null;
  ziobj.value = null;
  state.pname = "";
  state.ename = "";
  state.zname = "";
  container.innerHTML = null;
};

watch(
  () => props.resetCount,
  (val) => cleanState()
);

const bindListener = (obj) => {
  obj.value.addEventListener("dragenter", setDragOverColor);
  obj.value.addEventListener("dragleave", removeDragOverColor);
  obj.value.addEventListener("drop", removeDragOverColor);
  obj.value.addEventListener("dragover", stop);
};

const unbindListener = (obj) => {
  obj.value.removeListener("dragenter", setDragOverColor);
  obj.value.removeListener("dragleave", removeDragOverColor);
  obj.value.removeListener("drop", removeDragOverColor);
  obj.value.removeListener("dragover", stop);
};

onMounted(() => {
  bindListener(pdobj);
  bindListener(exobj);
  pdobj.value.addEventListener("drop", (e) => sendDragFile(e, "pdf"));
  exobj.value.addEventListener("drop", (e) => sendDragFile(e, "excel"));
});
onUnmounted(() => {
  unbindListener(pdobj);
  unbindListener(exobj);
  // pdobj.value.removeEventListener("drop", (e) => sendDragFile(e, "pdf"));
  // exobj.value.removeEventListener("drop", (e) => sendDragFile(e, "excel"));
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#info {
  min-height: 600px;
  .top {
    margin-bottom: 20px;
    padding: 5px 15px;
    width: 100%;
    line-height: 50px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    label {
      font-size: 16px;
      color: #51ece2;
    }
    #name {
      padding: 2px 3px;
      width: 280px;
      height: 24px;
      cursor: text;
      border-radius: 2px;
      border: 1px solid #ccc;
      outline: none;
      &:focus-visible {
        border: 2px solid #409eff;
      }
    }
  }
  .item {
    position: relative;
    margin-bottom: 20px;
    padding: 20px 15px;
    border: 1px solid #ccc;
    .des {
      vertical-align: middle;
      display: inline-block;
      width: 220px;
      color: #51ece2;
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
      top: 60px;
      left: 400px;
      width: 400px;
      height: 24px;
      font-size: 14px;
      color: #00bfff;
    }
  }
  #zip-display {
    position: relative;
    left: 50px;
  }
  .line-progress {
    display: inline-block;
    width: 300px;
    height: 20px;
    border-radius: 20px;
    background: linear-gradient(90deg, #0f0, #0ff 0, transparent 0);
    border: 1px solid #88f;
  }
  .circle-progress {
    display: inline-block;
    position: relative;
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
  .d-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
}
</style>
