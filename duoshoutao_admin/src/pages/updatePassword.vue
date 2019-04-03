<template>
  <div class="root">
    <el-form label-width="110px" ref="sizeForm" :rules="rules" :model="sizeForm" size="small">
      <el-form-item label="请输入原密码" prop="usedPass" :error="passErr">
        <el-input v-model="sizeForm.usedPass" type="password"  placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input v-model="sizeForm.password" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="repeatPsw" required>
        <el-input v-model="sizeForm.repeatPsw" type="password" placeholder="请重复密码"></el-input>
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
    var validatePass = (rule, value, callback) => {
      var regpasswd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      var regp = regpasswd.test(value)
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.sizeForm.repeatPsw !== '') {
          this.$refs.sizeForm.validateField('repeatPsw')
        }
        if (!regp) {
          callback(new Error('密码格式不正确'))
        }
      }
      callback()
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.sizeForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      sizeForm: {
        repeatPsw: '',
        password: '',
        usedPass: ''
      },
      uid: JSON.parse(localStorage.getItem('userId')),
      rules: {
        usedPass: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repeatPsw: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      },
      value: '',
      usedPas: '',
      passErr: ''
    }
  },
  computed: {},
  methods: {
    onSubmit () {
      if (this.sizeForm.usedPass !== this.usedPas) {
        this.passErr = '原密码不正确'
        return
      }
      this.$refs.sizeForm.validate(valid => {
        if (valid) {
          let param = {}
          param.password = this.sizeForm.password
          param.uid = this.uid
          this.$axios
            .post('http://localhost:8088/admin/userCenter/updatePass', param)
            .then(res => {
              console.log(res)
              if (res.data.r === 'ok') {
                this.$message({
                  message: '修改密码成功',
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
      this.$axios
        .get(
          'http://localhost:8088/admin/userCenter/getUserInfo?uid=' + this.uid
        )
        .then(res => {
          console.log(res)
          let data = res.data.r[0]
          this.usedPas = data.password
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
