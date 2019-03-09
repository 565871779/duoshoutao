<template>
  <div class="root">
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号"/>
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-button size="large" type="primary">保存</van-button>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      sms: '',
      phone: ''
    }
  },
  computed: {},
  methods: {},
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
