<template>
  <div class="root">
    <el-container>
      <el-header>
        <div class="head">
          <p>剁手淘</p>
          <span>注册</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="30vw"></el-aside>
        <el-main>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name" :error="errMsg" @input="clear">
              <el-input v-model="ruleForm.name"  placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repeatPsw" required>
              <el-input v-model="ruleForm.repeatPsw" type="password" placeholder="请重复密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel" required>
              <el-input type="tel" maxlength="11" v-model="ruleForm.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
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
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.repeatPsw !== '') {
          this.$refs.ruleForm.validateField('repeatPsw')
        }
        if (!regp) {
          console.log(123)
          callback(new Error('密码格式不正确'))
        }
      }
      callback()
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        password: '',
        repeatPsw: '',
        tel: ''
      },
      errMsg: '',
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repeatPsw: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        tel: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = {}
          param.uname = this.ruleForm.name
          param.phone = this.ruleForm.tel
          param.password = this.ruleForm.password
          console.log(param)
          this.$axios.post('http://localhost:8088/admin/regist', param).then(res => {
            console.log(res)
            if (res.data.r === 'user_existed') {
              this.errMsg = '账号已存在'
            }
            if (res.data.r === 'ok') {
              this.$message({
                message: '注册成功!',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/home')
              }, 1000)
            } else {
              this.$message.error('注册失败,请稍后再试')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    clear () {
      this.errMsg = ''
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root {
  width: 100%;
  .head {
    color: #f8831e;
    margin-left: 30vw;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    p {
      font-size: 30px;
      margin-right: 10px;
    }
    span {
      font-size: 20px;
      margin-top: 5px;
    }
  }
  .el-container {
      margin-top: 30px;
      width: 60vw;
  }
}
</style>
