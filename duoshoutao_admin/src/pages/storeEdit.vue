<template>
  <div class="root">
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="店铺名称">
        <el-input v-model="sizeForm.name" placeholder="请输入店铺名称"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述">
        <el-input v-model="sizeForm.detail" placeholder="请输入店铺描述"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8088/uploads"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name='images'
        >
          <img v-if="sizeForm.imageUrl" :src="sizeForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      sizeForm: {
        name: '',
        imageUrl: '',
        detail: ''
      },
      uid: JSON.parse(localStorage.getItem('userId'))
    }
  },
  computed: {},
  methods: {
    onSubmit () {
      console.log(this.sizeForm)
      let param = {}
      param.sname = this.sizeForm.name
      param.detail = this.sizeForm.detail
      param.uid = this.uid
      param.imageUrl = this.sizeForm.imageUrl
      this.$axios.post('http://localhost:8088/admin/saveStore', param).then((res) => {
        console.log(res)
        if (res.data.r === 'user_existed') {
          this.$message.error('店铺名已存在')
        }
        if (res.data.r === 'ok') {
          this.$message({
            message: '保存店铺成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('./home')
          }, 1000)
        }
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.sizeForm.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
}
</style>
