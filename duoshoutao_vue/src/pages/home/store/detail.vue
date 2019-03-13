<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(imageUrl, index) in goods.imageUrl" :key="index">
        <img :src="imageUrl">
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.details }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：免运费</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link>
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link/>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link/>
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat-o">客服</van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart-o" @click="onClickCart">购物车</van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="addShopCar">加入购物车</van-goods-action-big-btn>
      <van-goods-action-big-btn @click="addShopCar" primary>立即购买</van-goods-action-big-btn>
    </van-goods-action>
    <van-sku
      v-model="showBase"
      :sku="skuData.sku"
      :goods="skuData.goods_info"
      :goods-id="skuData.goods_id"
      :hide-stock="skuData.sku.hide_stock"
      :quota="skuData.quota"
      :quota-used="skuData.quota_used"
      reset-stepper-on-hide
      reset-selected-sku-on-hide
      disable-stepper-input
      :close-on-click-overlay="closeOnClickOverlay"
      :message-config="messageConfig"
      :custom-sku-validator="customSkuValidator"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant'
import skuData from './data'
import { LIMIT_TYPE } from './constants'
import axios from 'axios'
export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },
  data () {
    this.skuData = skuData
    return {
      goods: {
        title: '美国伽力果（约680g/3个）',
        price: 2680,
        remain: 19,
        imageUrl: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ]
      },
      showBase: false,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      initialSku: {
        s1: '30349',
        s2: '1193'
      },
      customSkuValidator: () => '请选择商品属性',
      customStepperConfig: {
        quotaText: '单次限购100件',
        stockFormatter: stock => `剩余${stock}件`,
        handleOverLimit: data => {
          const { action, limitType, quota } = data
          if (action === 'minus') {
            this.$toast('至少选择一件商品')
          } else if (action === 'plus') {
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              this.$toast(`限购${quota}件`)
            } else {
              this.$toast('库存不够了')
            }
          }
        }
      },
      messageConfig: {
        uploadImg: (file, img) =>
          new Promise(resolve => {
            setTimeout(() => resolve(img), 1000)
          }),
        uploadMaxSize: 3
      }
    }
  },
  methods: {
    formatPrice () {
      return '¥' + (this.goods.price / 1).toFixed(2)
    },
    onClickCart () {
      this.$router.push('/home/shopCar')
    },
    addShopCar () {
      this.showBase = true
    },
    onBuyClicked (data) {
      this.$router.push('/order/createOrder?gid=' + this.$route.query.gid)
    },
    onAddCartClicked (data) {
      console.log('buy:' + JSON.stringify(data))
      let param = {}
      param.gid = this.$route.query.gid
      console.log(this.$route.query.gid)
      param.uid = JSON.parse(localStorage.getItem('userId'))
      param.creatTime = new Date().getTime()
      param.loseTime = param.creatTime + 1000 * 60 * 2
      param.number = data.selectedNum

      axios.post('http://localhost:8088/detail/addShopCar', param).then(this.addCartClickedSuccess).catch()
    },
    addCartClickedSuccess (res) {
      console.log(res)
      this.$toast('添加成功，赶紧看看吧')
    },
    getGoodsDetail () {
      let gid = this.$route.query.gid
      axios.get('http://localhost:8088/detail?gid=' + gid).then(this.getGoodsDetailSuccess).catch()
    },
    getGoodsDetailSuccess (res) {
      this.goods = res.data.r[0]
      let data = this.skuData
      let list = data.sku.list
      let inventory = this.goods.inventory
      let sellNumber = this.goods.sellNumber
      this.goods.remain = inventory - sellNumber
      this.goods.imageUrl = [this.goods.imageUrl, this.goods.imageUrl]
      console.log(this.skuData.sku.tree[0].v[0].imgUrl)
      this.skuData.sku.tree[0].v[0].imgUrl = this.goods.imageUrl[0]
      console.log(this.skuData.sku.tree[0].v[1].imgUrl)
      data.sku.tree[0].v[1].imgUrl = this.goods.imageUrl[1]
      data.goods_info.title = this.goods.gname
      data.goods_info.picture = this.goods.imageUrl[1]
      data.sku.price = (this.goods.price).toFixed(2)
      for (var i = 0; i < list.length; i++) {
        list[i].price = (this.goods.price * 100).toFixed(2)
      }
      this.skuData = data
    }
  },
  created () {
    this.getGoodsDetail()
  }
}
</script>

<style lang="scss">
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}
</style>
