<template>
  <div class="root">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <div class="header">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550908496573&di=504808e0820f8ad2cf8b2899568beca1&imgtype=0&src=http%3A%2F%2Fwww.1288.tv%2FImg%2FImgBrand%2F2016%2F11-8%2F201611816231387126.jpg"
          alt
        >
      </div>
    </div>
    <div class="main">
      <div class="item">
        <div class="input">
          <label for>
            用户名:
            <input type="text" placeholder="请输入用户名" v-model="uname">
          </label>
        </div>
        <div class="input">
          <label for>
            密码:
            <input type="password" placeholder="请输入密码" v-model="password">
          </label>
        </div>
        <div class="input" style="display:flex;justify-content: space-between;align-items: center">
          <label for>
            验证码:
            <input style="width:60%" type="text" placeholder="请输入验证码" v-model="captchaVal">
          </label>
          <div v-html="captcha" @click="getCaptcha()"></div>
        </div>
      </div>
      <div class="button" @click="login">登   录</div>
      <div class="other">
        <p @click="toRegist">快速注册</p>
        <p>忘记密码</p>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '@/common/myheader'
import axios from 'axios'
import { Toast } from 'vant'
export default {
  components: {
    myheader,
    [Toast.name]: Toast
  },
  data () {
    return {
      uname: '',
      password: '',
      captcha: '',
      captchaVal: ''
    }
  },
  computed: {},
  methods: {
    login () {
      let param = {}
      param.uname = this.uname
      param.password = this.password
      param.captcha = this.captchaVal
      axios
        .post('http://localhost:8088/login', param)
        .then(this.loginSucess)
        .catch(this.loginErr)
    },
    loginSucess (res) {
      console.log(res)
      if (res.data.r === 'coder_err') {
        Toast.fail({
          mask: false,
          message: '验证码错误!'
        })
        return
      }
      if (res.data.r === 'no_user') {
        Toast.fail({
          mask: false,
          message: '用户名不存在'
        })
        return
      }
      if (res.data.r === 'p_err') {
        Toast.fail({
          mask: false,
          message: '密码错误'
        })
        return
      }
      Toast.success({
        mask: false,
        message: '登录成功'
      })
      localStorage.setItem('userId', res.data.uid)
      setTimeout(() => {
        localStorage.setItem('bottomClick', 0)
        this.$router.push('/home')
      }, 1000)
    },
    loginErr (err) {
      console.log(err)
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    toRegist () {
      this.$router.push('/register')
    },
    getCaptcha () {
      axios.get('http://localhost:8088/coder')
        .then(res => {
          this.captcha = res.data
        })
    }
  },
  mounted () {
    this.getCaptcha()
  }
}
</script>
<style lang="scss" scoped>
.root {
  width: 100%;
  background-color: #f0f2ff63;
  min-height: 100vh;
  .header {
    width: 100%;
    height: 5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item {
    margin: 0.1rem auto;
    width: 98%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 0.1rem;
    padding: 0.2rem;
    box-sizing: border-box;
    .input {
      width: 100%;
    }
    label {
      display: block;
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #ccc;
      font-weight: bold;
      font-size: 0.32rem;
    }
  }
  .button {
    width: 95%;
    height: 0.8rem;
    border-radius: .2rem;
    margin: 0.3rem auto;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.34rem;
    font-weight: bold;
    background-color: #f8831e;
    color: #fff;
    border: 1px solid #ccc;
  }
  .other {
    display: flex;
    justify-content: space-between;
    color: #ccc;
    padding: 0 0.2rem;
  }
  .van-nav-bar__text,.van-icon {
    color: #f8831e;
  }
}
</style>
