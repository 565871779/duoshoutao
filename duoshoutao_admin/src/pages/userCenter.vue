<template>
  <div class="root">
    <el-form ref="sizeForm" :rules="rules" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="用户名" prop="name" >
        <el-input v-model="sizeForm.name" disabled placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="name" >
        <el-input v-model.number="sizeForm.tel" placeholder="请输入要更改的手机号"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8088/uploads"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="images"
        >
          <img v-if="sizeForm.imageUrl" :src="sizeForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保存</el-button>
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
        tel: ''
      },
      uid: JSON.parse(localStorage.getItem('userId')),
      rules: {
        name: [
          { message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        tel: [{ message: '请输入要更改的手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }]
      },
      value: ''
    }
  },
  computed: {},
  methods: {
    onSubmit () {
      this.$refs.sizeForm.validate((valid) => {
        if (valid) {
          let param = {}
          param.imageUrl = this.sizeForm.imageUrl
          param.phone = this.sizeForm.tel
          param.uid = this.uid
          this.$axios.post('http://localhost:8088/admin/userCenter/updateInfo', param)
            .then(res => {
              console.log(res)
              if (res.data.r === 'ok') {
                this.$message({
                  message: '保存用户信息成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1000)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess (res, file) {
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
    },
    getUserInfo () {
      this.$axios.get('http://localhost:8088/admin/userCenter/getUserInfo?uid=' + this.uid)
        .then((res) => {
          console.log(res)
          let data = res.data.r[0]
          this.sizeForm.name = data.uname
          this.sizeForm.tel = data.phone
          this.sizeForm.imageUrl = data.uhead
        })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.root {
    width: 40vw;
    margin: 20vh auto;
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
