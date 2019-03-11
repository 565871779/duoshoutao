<template>
  <div class="root">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
  <van-icon name="search" slot="right" />
</van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div v-if="false">
          <img class="noorder" src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/noorder.jpg" alt="">
          <p>您还没有相关的订单</p>
          <br />
          <span>可以先去看看有哪些想买的</span>
        </div>
        <div v-else>
          <van-card
          num="2"
          tag="标签"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          origin-price="10.00"
          >
  <div slot="footer">
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </div>
</van-card>
        </div>
      </van-tab>
      <van-tab title="待付款">内容 2</van-tab>
      <van-tab title="待发货">内容 3</van-tab>
      <van-tab title="待收货">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, NavBar } from 'vant'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root {
  min-height: 100vh;
  background: #fafafa;
  /deep/ .van-nav-bar__text,.van-nav-bar .van-icon {
    color: #ff4444;
  }
  .van-nav-bar {
    background:  #fafafa;
  }
  /deep/ .van-tab--active {
    color: #ff4444 ;
  }
  /deep/ .van-tabs__nav--line {
      background:  #fafafa;
    }
  /deep/ .van-tabs__content {
    position: relative;
    width: 94%;
    margin: 0 auto;
    margin-top: .45rem;
    .noorder {
      width: 2.5rem;
      height: 2.5rem;
      margin: 2rem auto;
      display: block;
      margin-bottom: .5rem;
    }
    .van-card {
       background:  #fff;
       border-radius: .2rem;

    }
    p {
      font-size: .4rem;
      text-align: center;
    }
    span {
      text-align: center;
      display: block;
      color: #bcbcbc;
    }
  }
}
</style>
