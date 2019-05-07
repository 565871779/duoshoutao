<template>
  <div>
    <header>
    <img class="user-poster" src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/login_my_main.jpg">
    <div class="login" v-if="userName">
      <img :src="uhead" alt="">
      <p>{{userName}}</p>
    </div>
    <div class="login" v-else @click="toLogin()">
      <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/mine/login_logo_before_my_main.png" alt="">
      <p>登录/注册</p>
    </div>
    </header>
    <van-row class="user-links">
      <van-col span="6"  info="8" >
        <van-icon name="pending-payment"  @click="linkTo(1)"  :info="num" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" @click="linkTo(2)" :info="num1" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" @click="linkTo(3)" :info="num2" />
        已发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" @click="linkTo(4)" :info="num3" />
        已收货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link url="/order/myorder" />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="discount" title="设置" is-link url="/userUpdate" />
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from 'vant'
import axios from 'axios'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      uid: JSON.parse(localStorage.getItem('userId')),
      userName: '',
      uhead: '',
      num: '',
      num1: '',
      num2: '',
      num3: ''
    }
  },
  methods: {
    linkTo (id) {
      this.$router.push('/order/myorder?active=' + id)
    },
    getUserInfo () {
      axios.get('http://localhost:8088/userCenter/getUserInfo?uid=' + this.uid).then((res) => {
        console.log(res)
        let data = res.data.r[0]
        this.userName = data.uname
        this.uhead = data.uhead
      })
    },
    toLogin () {
      this.$router.push('/login')
    },
    checkOrderStatus () {
      axios.get('http://localhost:8088/createOrder/getOrderList?uid=' + this.uid)
        .then(res => {
          console.log(res)
          let data = res.data.r
          for (let i = 0; i < data.length; i++) {
            if (data[i].status === 0) {
              this.num++
            } else if (data[i].status === 1) {
              this.num1++
            } else if (data[i].status === 4) {
              this.num2++
            } else if (data[i].status === 5) {
              this.num3++
            }
          }
        })
    }
  },
  mounted () {
    if (this.uid) {
      this.getUserInfo()
    }
    this.checkOrderStatus()
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  .user-poster {
    width: 100%;
    height: 3rem;
  }
  .login {
    position: absolute;
    left: calc(50% - 0.6rem);
    top: .5rem;
    img {
      width: 1.2rem;
      border-radius: 50%;
    }
    p {
      color: #fff;
      text-align: center;
      margin-top: .3rem;
    }
  }
}
.van-icon {
  width: 45px;
  margin: 0 auto;
}
.user {
  &-poster {
    width: 100%;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }

}
</style>
