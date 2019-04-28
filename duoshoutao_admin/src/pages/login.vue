<template>
  <div class="login">
    <div class="login-mian">
      <div class="title">
        <strong>剁手掏</strong>商家管理系统
      </div>
      <el-form ref="loginForm" :model="login" :rules="loginRules">
        <el-form-item prop="name">
          <el-input placeholder="请输入用户名" v-model="login.name" clearable></el-input>
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

    <!-- 粒子漂浮物 -->
    <vue-particles
      :particle-opacity="0.7"
      :particles-number="30"
      :particle-size="5"
      :lines-width="2"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      :click-effect="true"
      click-mode="push"
      color="#fff"
      shape-type="star"
      hover-mode="grab"
      lines-color="#fff"
    />
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      login: {
        name: 'a123456',
        password: ''
      },
      checked: false,
      loginRules: {
        name: [
          {required: true, message: '请输入您的用户名', trigger: 'blur'}
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
    this.$axios.post('http://localhost:8088/admin/login', this.login).then(res => {
      console.log(res)
      let data = res.data
      localStorage.setItem('userId', data.uid)
      this.$message({
        message: '登录成功!',
        type: 'success'
      })
      if (data.admin === 0) {
        setTimeout(() => {
          this.$router.push('./home/store')
        }, 1000)
      } else {
        localStorage.setItem('admin', data.admin)
        this.$router.push('./admin')
      }
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
  background: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/login_bg.jpg') -20% 10%;
  background-size: contain;
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
