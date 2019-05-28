<template>
  <div class="root">
    <header>
      <img src="@/assets/images/order/headimg.png" alt>
      <p v-if="goods.status === 0">等待买家付款</p>
      <p v-else-if="goods.status === 1">已支付，等待卖家发货</p>
      <p v-else-if="goods.status === 4">卖家已发货，等待买家收货</p>
      <p v-else-if="goods.status === 5">已收货，订单已完成</p>
    </header>
    <van-cell value>
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
            <div class="address">{{address.detailadd }}</div>
          </div>
        </div>
      </template>
    </van-cell>
    <div class="card">
      <div class="shopname">永帅旗舰店
        <van-icon name="arrow"/>
      </div>
      <div class="goodsInfo">
        <div class="img">
          <img
            :src="goods.imageUrl"
            alt
          >
        </div>
        <div class="info">
          <div class="left">
            <div class="name">{{ goods.details }}</div>
            <div class="size">JK951</div>
          </div>
          <div class="right">
            <div class="price">￥{{ goods.price }}</div>
            <div class="num">{{ goods.num }}</div>
          </div>
        </div>
      </div>
      <div class="orderInfo">
        <div class="item">
          <p>商品总价</p>
          <span>￥{{ totalPrice }}</span>
        </div>
        <div class="item">
          <p>运费(物流)</p>
          <span>￥0.00</span>
        </div>
        <div class="item">
          <p>运险费(商家赠送)</p>
          <span>￥0.00</span>
        </div>
        <div class="item" style="color:black;font-size:.3rem">
          <p>订单总价</p>
          <span>￥{{ totalPrice }}</span>
        </div>
      </div>
    </div>
    <div class="needPay">
      <p v-if="goods.status === 0">需付款</p>
      <p v-else>已付款</p>
      <div>￥{{ totalPrice  }}
      </div>
    </div>
    <div class="orderInfo">
         <p class="title">订单信息</p>
         <div class="content">
             <div class="item">
                 <p class="item-name">
                     剁手淘积分:
                 </p>
                 <p class="item-value">
                     获得49点积分
                 </p>
             </div>
             <div class="item">
                 <p class="item-name">
                     订单编号:
                 </p>
                 <p class="item-value">
                     {{ goods.submitTime }}
                 </p>
             </div>
             <div class="item">
                 <p class="item-name">
                     创建时间:
                 </p>
                 <p class="item-value">
                     {{ goods.time }}
                 </p>
             </div>
         </div>
    </div>
    <div class="pay" v-show="goods.status === 0">
        <van-button round  plain @click="submit" type="danger">付款</van-button>
        <van-button round  plain @click="cancle">取消订单</van-button>
    </div>
    <van-popup v-model="show" position="bottom" @close="close()">
          <div class="header">
           <van-icon name="cross" size=".5rem" @click.native="close()"/>
           <p>确认付款</p>
           <van-icon name="question-o" size=".5rem" />
          </div>
          <div class="popupContent">
            <div class="price">
              <span>￥</span>
              {{totalPrice}}
            </div>
          </div>
          <div class="userInfo">
            <p>剁手淘账号</p>
            <span>{{uname}}</span>
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
        sname: 'sa',
        sphone: 'asd',
        detailadd: 'asdasfasfasfasfasfasfasfadfasfasfasddsa'
      },
      uid: JSON.parse(localStorage.getItem('userId')),
      oid: this.$route.query.oid,
      aid: '',
      goods: {
        details: '',
        gname: '',
        imageUrl: '',
        submitTime: '',
        price: '',
        time: '',
        num: '',
        status: 1,
        gid: ''
      },
      totalPrice: '',
      show: false,
      uname: ''
    }
  },
  computed: {},
  methods: {
    getOrderInfo () {
      axios.get('http://localhost:8088/createOrder/getDetail?oid=' + this.oid).then(this.getOrderInfoSuccess).catch()
    },
    getOrderInfoSuccess (res) {
      console.log(res)
      let data = res.data.r[0]
      this.aid = data.aid
      this.goods.details = data.details
      this.goods.gname = data.gname
      this.goods.imageUrl = data.imageUrl
      this.goods.submitTime = data.submitTime
      this.goods.price = data.price
      this.goods.num = data.num
      this.goods.status = data.status
      this.goods.gid = data.gid
      this.goods.time = new Date(data.submitTime / 1).toLocaleString()
      this.totalPrice = (this.goods.price * this.goods.num).toFixed(2)
      this.getAddress()
    },
    getAddress () {
      axios.get('http://localhost:8088/createOrder/getAddress?aid=' + this.aid)
        .then(this.getAddressSuccess)
    },
    getAddressSuccess (res) {
      console.log(res)
      let data = res.data.r[0]
      this.address.sname = data.sname
      this.address.sphone = data.sphone
      this.address.detailadd = data.detailadd + '   ' + data.saddress
    },
    cancle () {
      this.$dialog.confirm({
        message: '确定取消订单吗'
      }).then(this.cancleOrder).catch()
    },
    delectOrder () {
      this.$dialog.confirm({
        message: '您确定删除所选订单吗'
      })
        .then(() => {
          // on confirm
          axios
            .get('http://localhost:8088/createOrder/cancelOrder?oid=' + this.oid)
            .then(res => {
              if (res.data.r === 'ok') {
                this.$toast('删除订单成功')
                this.$router.go(-1)
              }
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    cancleOrder () {
      axios.get('http://localhost:8088/createOrder/cancelOrder?oid=' + this.oid)
        .then(res => {
          if (res.data.r === 'ok') {
            this.$toast.fail('已取消支付')
          }
        })
    },
    submit () {
      this.show = true
    },
    close () {
      this.$toast.fail('已取消支付')
      this.show = false
    },
    pay () {
      let param = {}
      param.oid = this.oid
      axios.post('http://localhost:8088/createOrder/payOrder', param)
        .then(res => {
          this.$toast.success('支付成功')
          setTimeout(() => {
            this.$router.push('/order/myorder')
          }, 1000)
        })
    }

  },
  mounted () {
    this.getOrderInfo()
  }
}
</script>
<style lang="scss" scoped>
.root {
  background: #f3f3f3;
  min-height: 100vh;
  header {
    width: 100%;
    height: 2.5rem;
    background: #fe6800;
    position: relative;
    p {
      color: white;
      font-size: 0.34rem;
      position: absolute;
      left: 0.5rem;
      top: 0.8rem;
    }
    img {
      width: 2rem;
      position: absolute;
      right: 0.8rem;
      top: 0.5rem;
    }
  }
  .slot {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    height: 1rem;
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
  .card {
    width: 100%;
    padding: 0.2rem;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 0.4rem;
    .goodsInfo {
      margin-top: 0.5rem;
      display: flex;
      justify-content: space-between;
      img {
        width: 2rem;
        border-radius: 0.15rem;
      }
      .info {
        display: flex;
        justify-content: space-between;
        color: #000;
        .left {
          margin-left: 0.2rem;
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box; //作为弹性伸缩盒子模型显示。
            -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
            -webkit-line-clamp: 2; //显示的行\
          }
          .size {
            color: #ccc;
            margin-top: 0.2rem;
          }
        }
        .right {
          text-align: right;
          .num {
            font-size: 0.24rem;
            color: #ccc;
            margin-top: 0.15rem;
          }
        }
      }
    }
    .orderInfo {
      width: 100%;
      margin-top: 0.6rem;
      color: #ccc;
      padding: 0;
      .item {
        display: flex;
        justify-content: space-between;
        padding: 0.1rem 0;
      }
    }
  }
  .needPay {
    border-top: 1px solid #ebedf0;
    padding: 0.3rem 0.2rem;
    font-size: 0.3rem;
    box-sizing: border-box;
    color: #000;
    background: #fafafa;
    display: flex;
    justify-content: space-between;
    div {
      color: #fe6800;
      small {
        font-size: 0.26rem;
      }
    }
  }
  .orderInfo {
      width: 100%;
      margin-top: .4rem;
      padding: .2rem;
      box-sizing: border-box;
      background: #fff;
      padding-bottom: 1rem;
      .title {
          border-left: 2px solid #fe6800;
          padding-left: .1rem;
      }
      .content {
          margin-top: .5rem;
          .item {
              display: flex;
              justify-content: space-between;
              padding: .15rem;
              .item-name {
                  width: 2rem;
              }
              .item-value {
                  flex-grow: 1;
              }
          }
      }
  }
  .pay {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    padding: .2rem;
    background: #fff;
    width: 100%;
    height: .5rem;
    display: flex;
    flex-direction: row-reverse;
    border-top: 1px solid #ebedf0;

    .van-button {
        height: .5rem;
        line-height: .5rem;
         margin-right: .6rem;
    }
    .van-button--round {
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
