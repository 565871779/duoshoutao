<template>
  <div class="root">
    <van-cell-group>
      <van-field
          v-model="passwordUsed"
          type="password"
          label="密码"
          placeholder="请输入原密码"
          required
          :error-message="usedErr"
          clearable
          @input="usedErr=''"
        />
      <van-field
       v-model="password"
        type="password"
        clearable label="新密码"
         placeholder="请输入密码"
          required
          @input="changePs"
           :error-message="errmsg.permsg"
          />
      <van-field v-model="passwordRep"
      :error-message="errmsg.aermsg"
      type="password" label="重复新密码" placeholder="请重复密码" required @input="changeAfirm"/>
    </van-cell-group>
    <van-button size="large" @click.native="submit" type="primary">保存</van-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      password: '',
      passwordRep: '',
      passwordUsed: '',
      usedErr: '',
      errmsg: {
        permsg: '',
        aermsg: ''
      },
      affirm: '',
      uid: localStorage.getItem('userId')
    }
  },
  computed: {},
  methods: {
    changePs () {
      var This = this
      var passwd = This.password
      var regpasswd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      var regp = regpasswd.test(passwd)
      if (!regp) {
        This.errmsg.permsg = ''
        This.errmsg.permsg = '密码格式不正确'
      } else {
        This.errmsg.permsg = ''
      }
    },
    changeAfirm () {
      var This = this
      var passwd = This.password
      var affirm = This.passwordRep
      if (affirm !== passwd) {
        This.errmsg.aermsg = ''
        This.errmsg.aermsg = '两次输入的密码不一致'
      } else {
        This.errmsg.aermsg = ''
      }
    },
    submit () {
      if (!this.passwordUsed) {
        this.usedErr = '请输入原密码'
        return false
      }
      if (this.errmsg.permsg !== '' || this.errmsg.aermsg !== '') {
        console.log(132)
        return false
      }
      let param = {}
      param.password = this.password
      param.uid = this.uid
      param.usedPs = this.passwordUsed
      axios.post('http://localhost:8088/usercenter/changePs', param).then(this.submitSuccess)
    },
    submitSuccess (res) {
      console.log(res)
      if (res.data.r === 'pserr') {
        this.$toast('原密码错误')
      }
      if (res.data.r === 'ok') {
        this.$toast('修改成功')
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      }
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root {
    width: 100%;
    .van-button--large {
        margin: 0 auto;
        display: block;
        margin-top: .5rem;
        width: 80%;
        height: 1rem;
    }
}
</style>
