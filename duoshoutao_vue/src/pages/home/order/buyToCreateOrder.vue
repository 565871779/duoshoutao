/* eslint-disable vue/no-dupe-keys */
<template>
  <div class="root">
    <van-cell value is-link v-if="address.sname !== '暂无'" @click="toAddressList">
      <template slot="title">
        <div class="slot">
          <div class="icon">
            <img src="@/assets/images/users/receiveAddress.jpg" alt>
          </div>
          <div class="right">
            <div class="head">
              <p>{{address.sname}}</p>
              <span class="custom-text">{{address.sphone}}</span>
            </div>
            <div class="address">
              {{address.detailadd }}
              </div>
            <div class="tip">收货不便时，可选择免费代收货服务</div>
          </div>
        </div>
      </template>
    </van-cell>
    <div v-else></div>
    <van-card
      :num="num"
      :price="price"
      :desc="details"
      :title="gname"
      :thumb="imageUrl"
    >
      <div slot="footer">
        <van-cell value="普通配送">
          <template slot="title">
            <span class="custom-text">购买数量</span>
          </template>
          <template slot>
            <div class="content" style="flex-direction: row-reverse; margin-left:.5rem">
              <div class="van-stepper van-sku__stepper">
                <button class="van-stepper__minus" :class="{'van-stepper__minus--disabled': num===1}" @click="num>1?num--:''"></button>
                <input type="number" :disabled="true" class="van-stepper__input" v-model="num">
                <button class="van-stepper__plus" @click="num++"></button>
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
              <span>￥{{ totalPrice }}</span>
            </h6>
          </div>
        </div>
      </div>
    </van-card>
    <van-submit-bar :price="totalPrice * 100 " button-text="提交订单" @click.native="show = true"  @submit="submit"/>
    <van-popup v-model="show" position="bottom">
          <div class="header">
           <van-icon name="cross" size=".5rem" @click.native="show=false"/>
           <p>确认付款</p>
           <van-icon name="question-o" size=".5rem" />
          </div>
          <div class="popupContent">
            <div class="price">
              <span>￥</span>
              99.00
            </div>
          </div>
          <div class="userInfo">
            <p>剁手淘账号</p>
            <span>Emiya</span>
          </div>
          <div class="userInfo">
            <p>付款方式</p>
            <span>支付宝<van-icon name="arrow" /></span>
          </div>
          <van-button type="info"  size="large" @click="pay">确认支付</van-button>
      </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      address: {
        sname: '暂无',
        sphone: '',
        detailadd: ''
      },
      gname: '',
      details: '',
      imageUrl: '',
      price: 0,
      num: 1,
      totalPrice: 0,
      aid: '',
      show: false
    }
  },
  watch: {
    price: function (val) {
      console.log(this.totalPrice)
      this.totalPrice = (this.price * this.num).toFixed(2)
    },
    num: function (val) {
      console.log(this.totalPrice)
      this.totalPrice = (this.price * this.num).toFixed(2)
    }
  },
  methods: {
    toAddressList () {
      this.$router.push('/address/addresslist')
    },
    getAddress () {
      axios.get('http://localhost:8088/address/getAddress?uid=' + JSON.parse(localStorage.getItem('userId'))).then(this.getAddressSuccess).catch()
    },
    getAddressSuccess (res) {
      if (res.data.r.length === 0) {
        this.$dialog.confirm({
          title: '请先设置收货地址',
          message: '您还没有设置收货地址，请点击这里设置'
        }).then(() => {
          console.log(666)
          this.$router.push('/address/addressadd')
        }).catch(() => {
          this.$router.go(-1)
        })
      }
      let data = res.data.r[0]
      this.address.sname = data.sname
      this.address.sphone = data.sphone
      this.address.detailadd = data.saddress + ' ' + data.detailadd
      this.aid = data.aid
      console.log(this.address)
    },
    getGoodsInfo () {
      axios.get('http://localhost:8088/createOrder?gid=' + this.$route.query.gid).then(this.getGoodsInfoSuccess).catch()
    },
    getGoodsInfoSuccess (res) {
      let data = res.data.r[0]
      this.gname = data.gname
      this.imageUrl = data.imageUrl
      this.price = data.price
      this.details = data.details
    },
    submit () {
      let param = {}
      param.aid = this.aid
      param.gid = this.$route.query.gid
      param.num = this.num
      param.uid = JSON.parse(localStorage.getItem('userId'))
      param.submitTime = new Date().getTime()
      param.loseTime = param.submitTime + 1000 * 60 * 5
      axios.post('http://localhost:8088/createOrder/saveOrder', param).then(this.submitSuccess).catch((err) => { console.log(err) })
    },
    submitSuccess (res) {
      console.log(res)
    },
    pay () {
      this.$toast.success('支付成功')
    }
  },
  mounted () {
    this.getAddress()
    this.getGoodsInfo()
  }
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
  .van-popup--bottom {
    min-height: 70vh;
    .header {
        display: flex;
        justify-content: space-between;
        padding: .3rem;
        box-sizing: border-box;
        border-bottom: 1px solid #fbf7f7;
        align-items: center;
        >p {
          font-size: .34rem;
        }
          }
      .popupContent {
        padding-top: .8rem;
        padding-bottom: .5rem;
        .price {
          font-size: .7rem;
          font-weight: bold;
          text-align: center;
          span {
            font-size: .5rem;
          }
        }
      }
      .userInfo {
        padding: .3rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #fbf7f7;
        align-items: center;
      }
      .van-button--info {
        background: #1989fa;
        width: 92%;
        margin: 0 auto;
        margin-top: 2rem;
        display: block;
        border-radius: .15rem;
        color: #fff;
      }
  }
}
</style>
