<template>
  <div id="info">
    <div class="top">
      <label>姓名：</label
      ><input
        v-model="user"
        type="text"
        placeholder="请输入姓名，否则以发票名/压缩包名命名"
      />
    </div>
    <div class="item">
      <span class="des">单张发票重命名</span>
      <div class="upload-wrapper">
        <input
          class="upload-file"
          ref="pdobj"
          type="file"
          accept=".pdf"
          @change="handlePdf('pdf')"
        />
      </div>
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
import { computed, ref } from "vue"
import { uploadDir, outputDir } from "../utils/config"

const user = ref("")
const pdobj = ref(null)
const exobj = ref(null)
const ziobj = ref(null)

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
    padding-left: 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 1px solid #ccc;
    label {
      font-size: 16px;
      color: #51ece2;
    }
    input {
      padding: 2px 3px;
      cursor: pointer;
      border: none;
    }
    #name {
      width: 280px;
      height: 24px;
      cursor: default;
      border-radius: 2px;
    }
  }
  .item {
    margin-bottom: 20px;
    padding: 20px 15px;
    border: 1px solid #ccc;
    .des {
      vertical-align: top;
      display: inline-block;
      width: 220px;
      color: #51ece2;
    }
    input {
      vertical-align: top;
      padding: 2px 3px;
      cursor: pointer;
    }
    .upload-wrapper {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      background: #409eff;
      position: relative;
      text-align: center;
      color: #ffffff;
      border-radius: 5px;
      .upload-file {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*透明度为0*/
        opacity: 0;
        cursor: pointer;
      }
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
