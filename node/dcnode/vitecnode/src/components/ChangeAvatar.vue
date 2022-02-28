<template>
  <div class="file-wrapper">
    <label class="file-chooser">
      <div class="des">上传头像</div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        @change="uploadAvatar"
      /><br />
    </label>
  </div>
</template>
<script lang="ts" setup name="ChangeAvatar">
import { baseUrl } from "@/api/axios";
import { uploadUserAvatar } from "@/api/user";
import { useUserStore } from "@/store/user";
import { tip } from "@/utils";

const userStore = useUserStore();

const emits = defineEmits(["closeAvatar"]);

const uploadAvatar = (e: any) => {
  let tmp = e.target.files[0];
  let data = new FormData();
  data.append("avatar", tmp);
  uploadUserAvatar(data)
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
  z-index: 10000;
  .file-chooser {
    position: absolute;
    padding: 20px;
    left: 30%;
    top: 30%;
    width: 360px;
    height: 100px;
    background: #fff;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: #5364a3;
    }
    .des {
      margin-bottom: 20px;
      width: 100%;
      text-align: center;
    }
    .input {
      display: block;
      background: #c324f2;
    }
  }
}
</style>
