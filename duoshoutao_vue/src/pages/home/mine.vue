<template>
  <div class="root">
      <header>
          <div></div>
          <div class="bottom">
              <div>浏览历史</div>
              <div>关注的店铺</div>
              <div>我的评价</div>
          </div>
      </header>
      <div class="item">
          <div class="left">
              <div class="icon"></div>
              <p>我的订单</p>
          </div>
          <div class="right">查看全部订单 ></div>
      </div>
      <div class="item-group">
          <div class="item">
              <div class="left">我的钱包</div>
          </div>
          <div class="item">
          <div class="left">
              <div class="icon"></div>
              <p>服务与反馈</p>
          </div>
          <div class="right">意见反馈搬这了 ></div>
      </div>
      <div class="item">
          <div class="left">
              <div class="icon"></div>
              <p>剁手掏会员</p>
          </div>
          <div class="right">会员俱乐部 ></div>
      </div>
      <div class="item">
          <div class="left">
              <div class="icon"></div>
              <p>猜你喜欢</p>
          </div>
          <div class="right">查看全部订单 ></div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
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
    border-top: 1px solid #fff;
    background: #fafafa;
    min-height: 100vh;
    header {
        width: 100%;
        height: 4rem;
        background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/login_my_main.jpg');
        background-repeat: no-repeat;
        background-position: cover;
        border-top: 1px solid #fff;
        position: relative;
        margin-bottom: .4rem;
        >div:first-child {
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            margin: .8rem auto;
            border-radius: 50%;
            background: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/login_logo_before_my_main.png');
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            position: absolute;
            width: 100%;
            background: rgba(255,255,255,.5);
            bottom: 0;
            div {
                border-right: 1px solid #ccc;
                text-align: center;
                width: 33%;
                height: 1rem;
                line-height: 1rem
            }
        }
    }
    .item-group {
        margin-top: .3rem;
    }
    .item {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: white;
        margin-top: .1rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        .left {
            font-size: .4rem;
        }
        .right {
            color: #ccc;
            font-size: .32rem;
        }
    }

}
</style>
