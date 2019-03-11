<template>
  <div class="root">
    <van-cell value is-link>
      <template slot="title">
        <div class="slot">
          <div class="icon">
            <img src="@/assets/images/users/receiveAddress.jpg" alt>
          </div>
          <div class="right">
            <div class="head">
              <p>XXX</p>
              <span class="custom-text">13668409856</span>
            </div>
            <div class="address">164564654asfasfasfasfasfasfasfasgasdgas56asas</div>
            <div class="tip">收货不便时，可选择免费代收货服务</div>
          </div>
        </div>
      </template>
    </van-cell>
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
        <van-cell value="普通配送">
          <template slot="title">
            <span class="custom-text">购买数量</span>
          </template>
          <template slot>
            <div class="content" style="flex-direction: row-reverse; margin-left:.5rem">
              <div class="van-stepper van-sku__stepper">
                <button class="van-stepper__minus van-stepper__minus--disabled"></button>
                <input type="number" disabled="disabled" class="van-stepper__input" v-model="number">
                <button class="van-stepper__plus"></button>
              </div>
            </div>
          </template>
        </van-cell>
        <van-cell value="普通配送" is-link>
          <template slot="title">
            <span class="custom-text">配送方式</span>
          </template>
          <template slot>
            <div class="content">
              <p>普通快递</p>
              <span class="custom-text">快递 免邮</span>
            </div>
          </template>
        </van-cell>
        <van-cell value is-link>
          <template slot="title">
            <span class="custom-text">运费险&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </template>
          <template slot>
            <div class="content">
              <p>卖家送，确认收货前退货可赔</p>
              <span class="custom-text"></span>
            </div>
          </template>
        </van-cell>
        <van-cell value is-link>
          <template slot="title">
            <span class="custom-text">店铺优惠</span>
          </template>
          <template slot>
            <div class="content">
              <p>省3元:淘抢购下单立减玩法</p>
              <span class="custom-text"></span>
            </div>
          </template>
        </van-cell>
        <van-cell value="普通配送" is-link>
          <template slot="title">
            <span class="custom-text">订单备注</span>
          </template>
          <template slot>
            <div class="content">
              <p>选填，请先和商家协商一致</p>
              <span class="custom-text"></span>
            </div>
          </template>
        </van-cell>
        <div class="result">
          <div>
            <p>共1件</p>
            <h6>
              小计:
              <span>￥11.50</span>
            </h6>
          </div>
        </div>
      </div>
    </van-card>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      number: 0
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root {
  background-color: #f8f8f8;
  min-height: 100vh;
  border: 1px solid #f8f8f8;
  .van-cell {
    border-radius: 0.2rem;
    width: 96%;
    margin: 0.2rem auto;
  }
  .slot {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    height: 2rem;
    .icon {
      width: 0.6rem;
      align-self: center;
      flex-shrink: 0;
      img {
        display: block;
        width: 100%;
      }
    }
    .right {
      flex-grow: 1;
      margin-left: 0.4rem;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      .head {
        display: flex;
        justify-content: space-between;
        p {
          margin-right: 0.1rem;
          font-size: 0.34rem;
        }
        span {
          font-size: 0.24rem;
          color: #ccc;
          flex-grow: 1;
        }
      }
      .tip {
        color: #f8831e;
      }
      .address {
        word-wrap: wrap;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        line-height: 1;
      }
    }
  }
  .van-card:not(:first-child) {
    width: 96%;
    margin: auto;
  }
  .van-cell__title,
  .van-cell__value {
    flex: none;
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-left: 0.2rem;
    width: 56vw;
    //   p {
    //       flex: 1;
    //   }
  }
  .van-card {
    background: #fff;
    border-radius: 0.2rem;
    .result {
      display: flex;
      flex-direction: row-reverse;
      div {
        width: 2.5rem;
        display: flex;
        justify-content: space-between;
        p {
          color: #999;
        }
        h6 {
          color: #000;
          span {
            color: #f8831e;
          }
        }
      }
    }
  }
  .van-card__footer {
    .van-cell {
      padding-right: 0;
    }
    .van-stepper {
      width: 2rem;
      .van-stepper__input {
        width: 20px;
        height: 20px;
      }
      .van-stepper__minus,
      .van-stepper__plus {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
