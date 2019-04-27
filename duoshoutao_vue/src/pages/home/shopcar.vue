<template>
  <div class="root">
    <div v-if="goods.length === 0" class="nogoods">
      <img src="@/assets/images/users/nogoods.png" alt>
      <p>购物车居然是空的</p>
      <span>再忙，也要及得买点什么犒赏自己~</span>
    </div>
    <div v-else>
      <van-checkbox-group class="card-goods" v-model="checkedGoods">
        <van-checkbox class="card-goods__item" v-for="(item,index) in goods" :key="index" :name="item.id">
          <van-card
            :title="item.name"
            :desc="item.details"
            :num="item.num"
            :price="formatPrice(item.price)"
            :thumb="item.imageUrl"
          />
        </van-checkbox>
      </van-checkbox-group>
      <van-button @click="delectItem" type="danger" plain>删除</van-button>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      checkedGoods: [],
      goods: [
        {
          gid: '1',
          name: '进口香蕉',
          details: '约250g，2根',
          price: 200,
          number: 1,
          imageUrl:
            'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
        }
      ],
      uid: ''
    }
  },
  computed: {
    submitBarText () {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },
    totalPrice () {
      return this.goods.reduce(
        (total, item) =>
          (total + 100 * (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0)),
        0
      )
    }
  },
  methods: {
    formatPrice (price) {
      return (price / 1).toFixed(2)
    },
    onSubmit () {
      console.log(this.checkedGoods)
      this.$router.push('/order/createOrder?id=' + this.checkedGoods)
    },
    getGoodsList () {
      axios.get('http://localhost:8088/shopCar/getShopCarList?uid=' + this.uid)
        .then(this.getGoodsListSuccess)
        .catch(err => console.log(err))
    },
    getGoodsListSuccess (res) {
      this.goods = res.data.r
      console.log(res)
    },
    delectItem () {
      this.$dialog.confirm({
        title: '确定从购物车中删除所选项吗？',
        message: ''
      }).then(() => {
        for (let i = 0; i < this.checkedGoods.length; i++) {
          axios.get('http://localhost:8088/shopCar/delect?id=' + this.checkedGoods[i])
            .then(this.delectItemSuccess)
            .catch()
        }
      }).catch(() => {
        // on cancel
      })
    },
    delectItemSuccess (res) {
      console.log(res)
      if (res.data.r === 'ok') {
        this.$toast('删除成功！')
      }
      this.getGoodsList()
    }
  },
  created () {
    this.uid = JSON.parse(localStorage.getItem('userId'))
    this.getGoodsList()
  }
}
</script>

<style lang="scss" scoped>
/deep/.card-goods {
  padding: 10px 0;
  box-sizing: border-box;
  background-color: #fff;
  &__item {
    position: relative;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;

    }
    .van-card__price {
      color: #f44;
    }
  }
}
.van-submit-bar {
  bottom: 1.2rem;
}
.van-button--plain {
  position: fixed;
  bottom: 1.2rem;
  z-index: 999;
}
.root {
  width: 100%;
  .nogoods {
    width: 60%;
    margin: 0 auto;
    img {
      width: 60%;
      display: block;
      margin: 2rem auto;
      margin-bottom: .8rem;
    }
    p {
      font-size: .38rem;
      text-align: center;
      margin-bottom: .3rem;
    }
    span {
      text-align: center;
      color: #ccc;
    }
  }
}
</style>
