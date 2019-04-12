<template>
  <div>
    <div class="root" v-if="uid">
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <van-icon name="search" slot="right"/>
      </van-nav-bar>
      <van-tabs v-model="active">
        <van-tab title="全部">
          <div v-if="list.length === 0">
            <img
              class="noorder"
              src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/noorder.jpg"
              alt
            >
            <p>您还没有相关的订单</p>
            <br>
            <span>可以先去看看有哪些想买的</span>
          </div>
          <div v-else>
            <van-card
              v-for="(item,index) in list"
              :key="index"
              :num="item.num"
              :price="item.price * item.num"
              :desc="item.details"
              :title="item.gname"
              :thumb="item.imageUrl"
              :tag="item.status === 0?'待付款':item.status===1?'待发货':item.status===4?'待收货':item.status===5?'已收货':''"
            >
              <div slot="footer">
                <div v-if="item.status === 0">
                  <van-button size="mini" @click.native="cancelOrder(item.oid)">取消订单</van-button>
                  <van-button size="mini" @click.native="toDetail(item.oid)">支付</van-button>
                </div>
                <div v-else-if="item.status === 4">
                  <van-button size="mini" @click.native="confirmReceipt(item.oid)">确认收货</van-button>
                  <van-button size="mini" @click.native="toDetail(item.oid)">查看详情</van-button>
                </div>
                <div v-else>
                  <van-button size="mini" @click.native="toDetail(item.oid)">查看详情</van-button>
                </div>
              </div>
            </van-card>
          </div>
        </van-tab>
        <van-tab title="待付款">
          <div v-if="list.filter((item)=>item.status === 0?true:false).length === 0">
            <img
              class="noorder"
              src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/noorder.jpg"
              alt
            >
            <p>您还没有相关的订单</p>
            <br>
            <span>可以先去看看有哪些想买的</span>
          </div>
          <div v-else>
            <van-card
              v-for="(item,index) in list.filter((item)=>item.status === 0?true:false)"
              :key="index"
              :num="item.num"
              :price="item.price * item.num"
              :desc="item.details"
              :title="item.gname"
              :thumb="item.imageUrl"
              :tag="item.status === 0?'待付款':item.status===1?'待发货':item.status===2?'待收货':''"
            >
              <div slot="footer">
                <div v-if="item.status === 0">
                  <van-button size="mini" @click.native="cancelOrder(item.oid)">取消订单</van-button>
                  <van-button size="mini" @click.native="toDetail(item.oid)">支付</van-button>
                </div>
                <div v-else>
                  <van-button size="mini" @click.native="toDetail(item.oid)">查看详情</van-button>
                </div>
              </div>
            </van-card>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div v-if="list.filter((item)=>item.status === 1?true:false).length === 0">
            <img
              class="noorder"
              src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/noorder.jpg"
              alt
            >
            <p>您还没有相关的订单</p>
            <br>
            <span>可以先去看看有哪些想买的</span>
          </div>
          <div v-else>
            <van-card
              v-for="(item,index) in list.filter((item)=>item.status === 1?true:false)"
              :key="index"
              :num="item.num"
              :price="item.price * item.num"
              :desc="item.details"
              :title="item.gname"
              :thumb="item.imageUrl"
              :tag="item.status === 0?'待付款':item.status===1?'待发货':item.status===4?'待收货':''"
            >
              <div slot="footer">
                <div v-if="item.status === 0">
                  <van-button size="mini">取消订单</van-button>
                  <van-button size="mini" @click.native="toDetail(item.oid)">支付</van-button>
                </div>
                <div v-else>
                  <van-button size="mini" @click.native="toDetail(item.oid)">查看详情</van-button>
                </div>
              </div>
            </van-card>
          </div>
        </van-tab>
        <van-tab title="待收货">
          <div v-if="list.filter((item)=>item.status === 4?true:false).length === 0">
            <img
              class="noorder"
              src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/noorder.jpg"
              alt
            >
            <p>您还没有相关的订单</p>
            <br>
            <span>可以先去看看有哪些想买的</span>
          </div>
          <div v-else>
            <van-card
              v-for="(item,index) in list.filter((item)=>item.status === 4?true:false)"
              :key="index"
              :num="item.num"
              :price="item.price"
              :desc="item.details"
              :title="item.gname"
              :thumb="item.imageUrl"
              :tag="item.status === 0?'待付款':item.status===1?'待发货':item.status===4?'待收货':''"
            >
              <div slot="footer">
                <div v-if="item.status === 4">
                  <van-button size="mini" @click.native="confirmReceipt(item.oid)">确认收货</van-button>
                  <van-button size="mini" @click.native="toDetail(item.oid)">支付</van-button>
                </div>
              </div>
            </van-card>
          </div>
        </van-tab>
        <van-tab title="已收货">
          <div v-if="list.filter((item)=>item.status === 5?true:false).length === 0">
            <img
              class="noorder"
              src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/noorder.jpg"
              alt
            >
            <p>您还没有相关的订单</p>
            <br>
            <span>可以先去看看有哪些想买的</span>
          </div>
          <div v-else>
            <van-card
              v-for="(item,index) in list.filter((item)=>item.status === 5?true:false)"
              :key="index"
              :num="item.num"
              :price="item.price"
              :desc="item.details"
              :title="item.gname"
              :thumb="item.imageUrl"
              :tag="'已收货'"
            >
              <div slot="footer">
                <div v-if="item.status === 5">
                  <van-button size="mini" @click.native="toDetail(item.oid)">查看详情</van-button>
                </div>
              </div>
            </van-card>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <toLogin v-else></toLogin>
  </div>
</template>

<script>
import { Tab, Tabs, NavBar, Dialog } from 'vant'
import axios from 'axios'
import toLogin from '../common/toLogin'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Dialog.name]: Dialog,
    toLogin
  },
  data () {
    return {
      uid: JSON.parse(localStorage.getItem('userId')),
      list: [],
      active: this.$route.query.active
    }
  },
  computed: {},
  methods: {
    getOrderList () {
      axios
        .get('http://localhost:8088/createOrder/getOrderList?uid=' + this.uid)
        .then(this.getOrderListSuccess)
    },
    getOrderListSuccess (res) {
      console.log(res)
      this.list = res.data.r
    },
    toDetail (id) {
      console.log(123)
      this.$router.push('/order/orderDetail?oid=' + id)
    },
    cancelOrder (id) {
      Dialog.confirm({
        message: '您确定删除所选订单吗'
      })
        .then(() => {
          // on confirm
          axios
            .get('http://localhost:8088/createOrder/cancelOrder?oid=' + id)
            .then(this.cancelOrderSucc)
        })
        .catch(() => {
          // on cancel
        })
    },
    cancelOrderSucc (res) {
      console.log(res)
      if (res.data.r === 'ok') {
        this.$toast('取消订单成功')
        this.getOrderList()
      }
    },
    confirmReceipt (id) {
      Dialog.confirm({
        message: '您确认已经成功收到宝贝了吗？'
      })
        .then(() => {
          this.postConfirm(id)
        })
        .catch()
    },
    postConfirm (id) {
      let param = { oid: id }
      axios
        .post('http://localhost:8088/createOrder/confirmRece', param)
        .then(res => {
          console.log(res)
          if (res.data.r === 'ok') {
            this.$toast.success('确认收货成功！')
            setTimeout(() => {
              this.$router.go(0)
            }, 1500)
          }
        })
    }
  },
  mounted () {
    this.getOrderList()
  }
}
</script>
<style lang="scss" scoped>
.root {
  min-height: 100vh;
  background: #fafafa;
  /deep/ .van-nav-bar__text,
  .van-nav-bar .van-icon {
    color: #ff4444;
  }
  .van-nav-bar {
    background: #fafafa;
  }
  /deep/ .van-tab--active {
    color: #ff4444;
  }
  /deep/ .van-tabs__nav--line {
    background: #fafafa;
  }
  /deep/ .van-tabs__content {
    position: relative;
    width: 94%;
    margin: 0 auto;
    margin-top: 0.45rem;
    .noorder {
      width: 2.5rem;
      height: 2.5rem;
      margin: 2rem auto;
      display: block;
      margin-bottom: 0.5rem;
    }
    .van-card {
      background: #fff;
      border-radius: 0.2rem;
    }
    p {
      font-size: 0.4rem;
      text-align: center;
    }
    span {
      text-align: center;
      display: block;
    }
  }
}
</style>
