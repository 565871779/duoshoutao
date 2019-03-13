<template>
  <div class="root">
    <van-cell-group>
      <van-field v-model="phone" maxlength='11'  label="手机号" placeholder="请输入手机号"/>
      <van-field v-model="sms" maxlength='6' center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-button size="large" type="primary" @click.native="submit">保存</van-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      sms: '',
      phone: '',
      uid: localStorage.getItem('userId')
    }
  },
  computed: {},
  methods: {
    submit () {
      if (this.sms.length < 6) {
        this.$toast('请输入验证码')
        return false
      }
      let param = {}
      param.tel = this.phone
      param.uid = this.uid
      axios.post('http://localhost:8088/usercenter/changePhone', param).then(this.submitSuccess)
    },
    submitSuccess (res) {
      console.log(res)
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
    .van-button--large {
        margin: 0 auto;
        display: block;
        margin-top: .5rem;
        width: 80%;
        height: 1rem;
    }
}
</style>
