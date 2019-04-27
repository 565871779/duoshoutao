<template>
  <div class="root">
    <Header></Header>
    <Aside @clickTab="refresh"></Aside>
    <div class="content">
      <div class="title">店铺管理</div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="sid">店铺信息修改</span>
          <span v-else>新增店铺</span>

        </div>
        <div class="text item">
          <el-form
            :model="sizeForm"
            :rules="rules"
            ref="sizeForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="店铺名称" prop="name">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="text item">
          <el-form
            ref="form"
            :model="sizeForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="店铺描述" prop="detail">
              <el-input type="textarea" v-model="sizeForm.detail" style="width:366px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="text item">
          <el-form
            :model="sizeForm"
            :rules="rules"
            ref="sizeForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="店铺头像">
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
          </el-form>
        </div>
        <div class="text item">
          <el-form
            :model="sizeForm"
            :rules="rules"
            ref="sizeForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item  v-if="sid">
              <el-button type="primary"  @click="save('sizeForm')">保存</el-button>
              <el-button @click="close()" type="danger">删除店铺</el-button>
            </el-form-item>
            <el-form-item size="large" v-else>
              <el-button type="primary"  @click="save('sizeForm')">立即创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import Aside from '@/components/aside'
export default {
  components: {
    Header,
    Aside
  },
  data () {
    return {
      sizeForm: {
        name: '',
        imageUrl: '',
        detail: ''
      },
      ruleForm: {
        name: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        detail: [{ required: true, message: '请填写店铺描述', trigger: 'blur' }]
      },
      uid: JSON.parse(localStorage.getItem('userId')),
      sid: this.$route.query.sid
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
      this.$axios
        .post('http://localhost:8088/admin/saveStore', param)
        .then(res => {
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
              this.$router.go(-1)
            }, 1000)
          }
        })
    },
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {}
          param.sname = this.sizeForm.name
          param.detail = this.sizeForm.detail
          param.sid = this.sid
          param.imageUrl = this.sizeForm.imageUrl
          this.$axios
            .post('http://localhost:8088/admin/saveStore/update', param)
            .then(res => {
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
      console.log(res)
      this.sizeForm.imageUrl = URL.createObjectURL(file.raw)
    },
    refresh () {
      this.sid = this.$route.query.sid
    },
    close () {
      this.$confirm('确定删除店铺吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('http://localhost:8088/admin/store/closeStore?sid=' + this.sid)
            .then(res => {
              if (res.data.r === 'ok') {
                this.$message({
                  type: 'success',
                  message: '关闭店铺成功!'
                })
                setTimeout(() => {
                  this.$router.go(-1)
                }, 2000)
              } else {
                this.$message.error('关闭店铺失败')
              }
            })
        })
        .catch(() => {})
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
    getStoreInfo () {
      this.$axios
        .get(
          'http://localhost:8088/admin/saveStore/getStoreInfo?sid=' + this.sid
        )
        .then(res => {
          console.log(res)
          let data = res.data.r[0]
          this.sizeForm.name = data.sname
          this.sizeForm.imageUrl = data.imageUrl
          this.sizeForm.detail = data.detail
        })
    }
  },
  mounted () {
    if (this.sid) {
      this.getStoreInfo()
    }
  }
}
</script>
<style lang="scss" scoped>
// .content {
//     background: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/login_bg.jpg') -20% 10%;
//     width: 100%;
//     min-height: 100vh;
//     overflow: hidden;
//     background-size: contain;
// }
.root {
  width: 100vw;
  // margin: 60px 240px;
  .content {
    margin: 0 250px;
    .title {
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      font-weight: bold;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .form {
    padding: 10px;
    background: #f0f2f5;
  }
  .el-form {
    .head {
      border-bottom: 1px solid #e8e8e8;
      padding: 16px 0;
      margin-bottom: 10px;
    }
    background: #fff;
    padding: 10px;
    p {
      padding-left: 10px;
    }
  }
  .el-form-item__label {
  }
  /deep/ .el-input__inner {
    width: 365px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
    border: 1px dashed;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
}
</style>
