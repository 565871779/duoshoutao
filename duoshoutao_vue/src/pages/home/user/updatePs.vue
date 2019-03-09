<template>
  <div class="root">
    <van-cell-group>
      <van-field v-model="passwordUsed" type="password" label="原密码" placeholder="请输入原密码" required/>
      <van-field v-model="password" type="password" label="新密码" placeholder="请输入密码" required/>
      <van-field v-model="passwordRep" type="password" label="重复新密码" placeholder="请重复密码" required/>
    </van-cell-group>
    <van-button size="large" type="primary">保存</van-button>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      password: '',
      passwordRep: '',
      passwordUsed: ''
    }
  },
  computed: {},
  methods: {},
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
