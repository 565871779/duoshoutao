<template>
  <div class="root">
      <myheader title="登陆">
      </myheader>
      <div class="content">
        <div class="header">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550908496573&di=504808e0820f8ad2cf8b2899568beca1&imgtype=0&src=http%3A%2F%2Fwww.1288.tv%2FImg%2FImgBrand%2F2016%2F11-8%2F201611816231387126.jpg" alt="">
        </div>
      </div>
      <div class="main">
        <div class="item">
          <div class="input">
              <label for="">
                账号:
                <input type="text">
                </label>
          </div>
          <div class="input">
              <label for="">
                密码:
                <input type="password">
                </label>
          </div>
        </div>
        <div class="button">
          登陆
        </div>
        <div class="other">
          <p>快速注册</p>
          <p>忘记密码</p>
        </div>
      </div>
  </div>
</template>

<script>
import myheader from '@/common/myheader'
export default {
  components: {
    myheader
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root{
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
    margin: .1rem auto;
    width: 98%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: .1rem;
    padding: .2rem;
    box-sizing: border-box;
    .input {
      width: 100%;
    }
    label {
      display: block;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      border-bottom: 1px solid #ccc;
      font-weight: bold;
      font-size: .32rem;
    }
  }
  .button{
    width: 95%;
    height: .8rem;
    margin: .3rem auto;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    font-size: .34rem;
    font-weight: bold;
    border-radius: .1rem;
    color: #ccc;
    border: 1px solid #ccc
  }
  .other {
    display: flex;
    justify-content: space-between;
    color: #ccc;
    padding: 0 .2rem;
  }

}
</style>
