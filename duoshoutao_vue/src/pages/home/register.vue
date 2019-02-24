<template>
  <div class="root">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <form action method>
      <van-cell-group>
        <van-field
          v-model="formdata.uname"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
          :error-message="errmsg.uermsg"
          @input="unameChange"
        />
        <van-field
          v-model="formdata.password"
          type="password"
          label="密码"
          placeholder="请输入6-16数字字母组合密码"
          :error-message="errmsg.permsg"
          required
          clearable
          @input="onChange"
        />
        <van-field
          v-model="affirm"
          type="password"
          label="确认密码"
          placeholder="请再次输入"
          :error-message="errmsg.aermsg"
          required
          clearable
          @input="onChange"
        />
        <van-field
          v-model="formdata.phone"
          type="text"
          label="手机号"
          placeholder="请输入大陆手机号"
          :error-message="errmsg.nermsg"
          required
          clearable
          @input="onChange"
        />
        <div class="radiosex">
          <span>性别</span>
          <van-radio-group v-model="formdata.usex">
            <van-radio name="1">男</van-radio>
            <van-radio name="0" class="vanradio">女</van-radio>
          </van-radio-group>
        </div>
        <div class="radiosex">
          <span>角色</span>
          <van-radio-group v-model="formdata.role">
            <van-radio name="1">用户</van-radio>
            <van-radio name="2">商家</van-radio>
          </van-radio-group>
        </div>
      </van-cell-group>
      <van-button size="large" @click="register">立即注册</van-button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      formdata: {
        uname: '',
        password: '',
        phone: '',
        role: '1',
        usex: '1'
      },
      errmsg: {
        permsg: '',
        aermsg: '',
        nermsg: '',
        uermsg: '',
        err: 0
      },
      affirm: ''
    }
  },
  computed: {},
  methods: {
    onClickLeft () {
      console.log(123)
    },
    unameChange () {
      this.errmsg.uermsg = ''
    },
    onChange () {
      var This = this
      This.err = 0
      var passwd = This.formdata.password
      var phonum = This.formdata.phone
      var affirm = This.affirm
      if (passwd) {
        var regpasswd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        var regp = regpasswd.test(passwd)
        if (!regp) {
          This.errmsg.permsg = ''
          This.errmsg.permsg = '密码格式不正确'
          This.errmsg.err++
        } else {
          This.errmsg.permsg = ''
        }
      }
      if (affirm) {
        if (affirm !== passwd) {
          This.errmsg.aermsg = ''
          This.errmsg.aermsg = '两次输入的密码不一致'
          This.errmsg.err++
        } else {
          This.errmsg.aermsg = ''
        }
      }
      if (phonum) {
        var regtel = /^[1][3,4,5,7,8][0-9]{9}$/
        var regph = regtel.test(phonum)
        if (!regph) {
          This.errmsg.nermsg = ''
          This.errmsg.nermsg = '手机号格式不正确'
          This.errmsg.err++
        } else {
          This.errmsg.nermsg = ''
        }
      }
    },
    register () {
      var This = this
      This.errmsg.uermsg = ''
      if (This.err) {
        return
      }
      axios({
        method: 'post',
        url: 'http://localhost:8088/register',
        data: This.formdata
      })
        .then(response => {
          console.log('请求成功', response.data)
          This.mydata = response.data
          if (This.mydata.r === 'user_existed') {
            This.errmsg.uermsg = '用户名已存在'
          }
          if (This.mydata.r === 'ok') {
            this.$router.push({ path: '/login' })
          }
        })
        .catch(response => {
          console.log('发送Ajax请求失败', response)
        })
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root {
  .van-nav-bar {
    height: 66px;
    line-height: 66px;
  }
  .van-nav-bar__title {
    margin-left: 76px;
  }
.van-cell {
    line-height: 40px;
    /deep/ .van-cell__value {
      padding-top: .2rem;
      .van-field__body {
        overflow: hidden;
      }
      i {
        position: absolute;
        right: 0;
      }
    }
  }
  .radiosex  {
    span {
      margin-left: 17px;
    }
    font-size: 14px;
    color: #323233;
    height: 60px;
    line-height: 60px;
    display: flex;
    .van-radio-group {
      display: inline-block;
      .van-radio {
        display: inline-block;
        margin-left: 60px;
      }
      .vanradio {
        margin-left: 74px;
      }
    }
  }
}
</style>
