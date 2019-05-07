<template>
  <div class="root">
      <van-nav-bar v-if="!isFind" title="请先登录" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
      <div class="content">
          <img src="@/assets/logo.png" alt="">
          <div>您还没有登录</div>
          <p>请先<span @click="toLogin">登录</span></p>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      isFind: window.location.href.includes('find')
    }
  },
  computed: {},
  methods: {
    toLogin () {
      this.$router.push('/login')
    }
  },
  mounted () {
    console.log(this.isFind)
  }
}
</script>
<style lang="scss" scoped>
.root{
    width: 100%;
    height: 100vh;
    background-color: #fff !important;
    position: fixed;
    top: 0;
    left: 0;
    .content {
        height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
     div {
        margin: .3rem;
    }
    span {
        color: #f8831e;
    }
    }
.van-nav-bar__text,.van-icon {
    color: #f8831e;
}
}
</style>
