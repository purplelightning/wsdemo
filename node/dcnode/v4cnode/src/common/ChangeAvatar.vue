<template>
  <div class="file-wrapper">
    <label class="file-chooser">
      <div class="des">上传头像</div>
      <input type="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar"><br/>
    </label>
  </div>
</template>
<script>
import api from 'requests/api'
import { mapMutations } from 'vuex'
import { baseUrl } from '@/requests/http'

export default {
  name: 'ChangeAvatar',
  data(){
    return {
    };
  },
  mounted(){},
  methods: {
    ...mapMutations(['setAvatar']),
    uploadAvatar(e){
      let tmp = e.target.files[0]
      let data = new FormData()
      data.append('avatar', tmp)
      api.uploadAvatar(data).then(res=>{
        if(res.status){
          this.setAvatar(baseUrl + res.data)
          this.$message.success('头像修改成功')
        }else{
          this.$message.error('头像上传失败')
        }
        this.$emit('closeAvatar')
      }).catch(err=>{
        this.$message.error(err)
        this.$emit('closeAvatar')
      })
    }
  },
}

</script>
<style lang="less" scoped>
.file-wrapper{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(111,111,111,.7);
  z-index: 10000;
  .file-chooser{
    position: absolute;
    padding-left: 20px;
    left: 30%;
    top: 30%;
    width: 360px;
    height: 100px;
    background: #fff;
    cursor: pointer;
    &:hover{
      color: #5364a3
    }
    .des{
      width: 100%;
      text-align: center;
    }
    .input{
      display: block;
      background: #c324f2;
    }
  }
}
</style>