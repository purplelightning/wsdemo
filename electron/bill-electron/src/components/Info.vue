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
        <p>上传文件</p>
        <input
          class="upload-file"
          ref="pdobj"
          type="file"
          accept=".pdf"
          @change="handlePdf('pdf')"
        />
      </div>
      <div class="file-name">{{state.pname}}</div>
    </div>
    <div class="item">
      <span class="des">单张发票重命名生成Excel</span>
      <div class="upload-wrapper">
        <input
          class="upload-file"
          ref="exobj"
          type="file"
          accept=".pdf"
          @change="handlePdf('excel')"
        />
      </div>
    </div>
    <div class="item">
      <span class="des">发票压缩包处理<br />(zip格式，需要不带目录压缩)</span>
      <div class="upload-wrapper">
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
    <section id="container"></section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue"
import { uploadDir, outputDir } from "../utils/config"

const user = ref("")
const pdobj = ref(null)
const exobj = ref(null)
const ziobj = ref(null)

const state = reactive({
  pname: '',
  ename: '',
  zname: ''
})

const handlePdf = (type) => {
  let dom = null
  if (type === "pdf") {
    dom = pdobj.value
  } else if (type === "excel") {
    dom = exobj.value
  }
  const tmp = dom.files[0]
  let filePath = tmp.path,
    fileName = user.value || tmp.name
    state.pname = tmp.name
  electron.ipcRenderer.send("convert-pdf", filePath, fileName)

  // const dataBuffer = fs.readFileSync(filePath)
  // const uploadPath = uploadDir + fileName
  // fs.writeFileSync(uploadPath, dataBuffer)
  // console.log(fileName + "写入成功")
}

const handleZip = () => {
  console.log("zip")
}
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
      &:focus-visible{
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
      vertical-align: top;
      display: inline-block;
      width: 220px;
      color: #51ece2;
    }
    .upload-wrapper {
      display: inline-block;
      position: relative;
      width: 150px;
      height: 30px;
      text-align: center;
      border-radius: 5px;
      p{
        z-index: 0;
        width: 100%;
        padding: 10px 0;
        background: #00bfff;
        color: #fff;
        font-size: 12px;
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
    .file-name{
      position: absolute;
      top: 30px;
      left: 400px;
      width: 400px;
      height: 24px;
      font-size: 14px;
      color:#00bfff;
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
