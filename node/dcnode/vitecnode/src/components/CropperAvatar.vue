<template>
  <div class="file-wrapper">
    <div class="bboo">
      <!-- 1.一个用于获取上传文件的input，type="file"，并且监听onchange事件  -->
      <input type="file" accept="image/*" id="imgReader" @change="loadingImg" />

      <!-- 2.一个用于给Cropper.js覆盖使用的img  -->
      <img id="cropImg" />

      <!-- 3.两个用于预览的div  -->
      <div class="previewText">裁剪预览</div>
      <div class="previewBox"></div>
      <div class="previewBoxRound"></div>
      <button @click="uploadAvatar">上传头像</button>
    </div>
  </div>
</template>
<script lang="ts" setup name="CropperAvatar">
import { useUserStore } from "@/store/user";
//引入Cropper.js
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { uploadUserAvatar } from "@/api/user";
import { baseUrl } from "@/api/axios";
import { tip } from "@/utils";
import { ref } from "vue";

let CROPPER: any = ref(null); //创建一个cropper的全局对象

const userStore = useUserStore();
const emits = defineEmits(["closeAvatar"]);

const loadingImg = (eve: any) => {
  if (CROPPER.value) {
    CROPPER.value.destroy();
  }
  //读取上传文件
  let reader = new FileReader();
  if (eve.target.files[0]) {
    //readAsDataURL方法可以将File对象转化为data:URL格式的字符串（base64编码）
    reader.readAsDataURL(eve.target.files[0]);
    reader.onload = (e) => {
      let dataURL = reader.result;
      //将img的src改为刚上传的文件的转换格式
      document.querySelector("#cropImg").src = dataURL;

      const image = document.getElementById("cropImg");

      //创建cropper实例-----------------------------------------
      CROPPER.value = new Cropper(image, {
        aspectRatio: 16 / 16,
        viewMode: 0,
        minContainerWidth: 500,
        minContainerHeight: 500,
        dragMode: "move",
        preview: [
          document.querySelector(".previewBox"),
          document.querySelector(".previewBoxRound"),
        ],
      });
    };
  }
};

const uploadAvatar = () => {
  //getCroppedCanvas方法可以将裁剪区域的数据转换成canvas数据
  CROPPER.value
    .getCroppedCanvas({
      maxWidth: 500,
      maxHeight: 500,
      fillColor: "#fff",
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    })
    .toBlob((blob: any) => {
      //然后调用浏览器原生的toBlob方法将canvas数据转换成blob数据

      //之后就可以愉快的将blob数据发送至后端啦，可根据自己情况进行发送，我这里用的是axios
      const formData = new FormData();
      // 第三个参数为文件名，可选填.
      formData.append("avatar", blob /*, 'example.png' */);
      uploadUserAvatar(formData)
        .then((res) => {
          if (res.status) {
            userStore.setAvatar(baseUrl + res.data);
            tip("头像修改成功");
          } else {
            tip("头像上传失败", "error");
          }
          emits("closeAvatar");
        })
        .catch((err) => {
          tip(err, "error");
          emits("closeAvatar");
        });
    });
};
</script>
<style lang="less" scoped>
.file-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(111, 111, 111, 0.7);
  .bboo {
    position: absolute;
    left: 140px;
    top: 40px;
    bottom: 140px;
    right: 100px;
    background: #fff;
    padding-top: 20px;
  }
}
.inpuFile {
  display: none;
}
.previewBox,
.previewBoxRound {
  position: absolute;
  right: -100px;
  top: 20px;
  box-shadow: 0 0 5px #adadad;
  width: 100px;
  height: 100px;
  overflow: hidden; /*这个超出设置为隐藏很重要，否则就会整个显示出来了*/
}
.previewBoxRound {
  top: 180px;
  border-radius: 50%; /*设置为圆形*/
}
</style>
