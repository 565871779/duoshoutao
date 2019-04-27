<template>
<div class="root">
  <Header></Header>
  <Aside @clickTab="refresh"></Aside>
  <div class="content">
    <div class="title">商品管理</div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="gid">商品信息修改</span>
          <span v-else>新增商品</span>

        </div>
        <div class="text item">
          <el-form ref="sizeForm" :rules="rules" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="商品名称"  prop="name">
        <el-input v-model="sizeForm.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="detail">
        <el-input type="textarea" v-model="sizeForm.detail" style="width:366px"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="sizeForm.price" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="inventory">
        <el-input v-model.number="sizeForm.inventory" placeholder="请输入商品库存"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-select v-model="sizeForm.classify" placeholder="请选择商品分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="imageUrl">
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
        detail: '',
        price: '',
        inventory: '',
        classify: ''
      },
      uid: JSON.parse(localStorage.getItem('userId')),
      options: [
        {
          value: '鲜花宠物',
          label: '鲜花宠物'
        }, {
          value: '鞋包配饰',
          label: '鞋包配饰'
        }, {
          value: '零食饮料',
          label: '零食饮料'
        }, {
          value: '运动户外',
          label: '运动户外'
        }, {
          value: '男装',
          label: '男装'
        }, {
          value: '生鲜水果',
          label: '生鲜水果'
        }, {
          value: '护肤美妆',
          label: '护肤美妆'
        }, {
          value: '手机数码',
          label: '手机数码'
        }, {
          value: '女装',
          label: '女装'
        }, {
          value: '图书音像',
          label: '图书音像'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入商品详情', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { type: 'number', message: '商品价格必须为数字值' }
        ],
        inventory: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { type: 'number', message: '库存必须为数字值' }
        ],
        classify: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '请上传商品图片', trigger: 'change' }
        ]
      },
      value: '',
      gid: this.$route.query.gid,
      sid: this.$route.query.sid
    }
  },
  computed: {},
  methods: {
    onSubmit () {
      this.$refs.sizeForm.validate((valid) => {
        if (valid) {
          let param = {}
          param.gname = this.sizeForm.name
          param.detail = this.sizeForm.detail
          param.sid = this.sid
          param.imageUrl = this.sizeForm.imageUrl
          param.price = this.sizeForm.price
          param.inventory = this.sizeForm.inventory
          param.classify = this.sizeForm.classify
          param.gid = this.gid
          if (this.gid) {
            this.$axios.post('http://localhost:8088/admin/store/saveGoods', param)
              .then(res => {
                console.log(res)
                if (res.data.r === 'ok') {
                  this.$message({
                    message: '保存商品成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.$router.go(-1)
                  }, 1000)
                }
              })
          } else {
            this.$axios.post('http://localhost:8088/admin/store/addGoods', param)
              .then(res => {
                console.log(res)
                if (res.data.r === 'ok') {
                  this.$message({
                    message: '保存商品成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.$router.go(-1)
                  }, 1000)
                }
              })
          }
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
    getGoodsInfo () {
      this.$axios.get('http://localhost:8088/admin/store/getGoods?gid=' + this.gid)
        .then(res => {
          console.log(res)
          let data = res.data.r[0]
          this.sizeForm.name = data.gname
          this.sizeForm.detail = data.details
          this.sizeForm.price = data.price
          this.sizeForm.imageUrl = data.imageUrl
          this.sizeForm.inventory = data.inventory
          this.sizeForm.classify = data.classify
        })
    }
  },
  mounted () {
    if (this.gid) {
      this.getGoodsInfo()
    }
  }
}
</script>
<style lang="scss" scoped>
.root {
    width: 100%;
    // margin: 20vh auto;
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
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/ .el-input__inner {
    width: 365px;
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
