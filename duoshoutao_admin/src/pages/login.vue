<template>
  <div class="login">
    <div class="login-mian">
      <div class="title">
        <strong>剁手掏</strong>商家管理系统
      </div>
      <el-form ref="loginForm" :model="login" :rules="loginRules">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="login.phone" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="login.password" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="password-save">
            <el-checkbox v-model="checked"></el-checkbox>下次自动登录
          </div>
          <el-button type="primary" :loading="loading" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      login: {
        phone: '13668409856',
        password: ''
      },
      checked: false,
      loginRules: {
        phone: [
          {required: true, message: '请输入您的登录手机号', trigger: 'blur'},
          { type: 'string', pattern: /^((1[3-8][0-9])+\d{8})$/, message: '请输入正确的手机号码格式', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入您的密码', trigger: 'blur'}
        ]
      },
      loading: false,
      smsText: '发送验证码'
    }
  },
  computed: {},
  methods: {onSms () {
    // const _this = this
    if (this.smsText !== '发送验证码') return false
    if (!(/^((1[3-8][0-9])+\d{8})$/.test(this.login.phone))) return this.$message.error('请输入正确的手机号码格式')
    // let count = 60
    this.$axios.post('http://localhost:8088/login', {phone: this.login.phone, password: this.login.password}).then(response => {
      console.log(response)
      // const {code, data, message} = response.data
      // if (code !== 0) return this.$message.error(message)
      // const smsTime = setInterval(() => {
      //   count -= 1
      //   _this.smsText = ` （${count}s） `
      //   if (count <= 0) {
      //     clearInterval(smsTime)
      //     _this.smsText = '发送验证码'
      //   }
      // }, 1000)
    })
  },
  onSubmit () {
    this.$refs['loginForm'].validate((valid) => {
      if (valid) this.snedLogin()
    })
  },
  snedLogin () {
    this.$axios.post('http://localhost:8088/login', this.login).then(res => {
      console.log(res)
      let data = res.data
      localStorage.setItem('userId', data.uid)
      this.$message({
        message: '登录成功!',
        type: 'success'
      })
      setTimeout(() => {
        this.$router.push('./home')
      }, 1000)
    })
  }},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #f0f2f4;
  .login-mian {
    width: 400px;
    margin: auto;
    padding: 80px 40px;
    position: relative;
    top: 50%;
    margin-top: -202px;
    .title {
      text-align: center;
      font-size: 20px;
      color: #333;
      margin-bottom: 30px;
      strong {
        color: #f8831e;
        font-weight: 700;
        font-size: 28px;
      }
    }
    .sms-code {
      cursor: pointer;
    }
    .el-form {
      width: 400px;
    }
    .el-button {
      display: block;
      width: 100%;
    }
    .password-save {
      color: #999;
      font-size: 13px;
      .el-checkbox {
        margin-right: 8px;
      }
    }
  }
}
</style>
