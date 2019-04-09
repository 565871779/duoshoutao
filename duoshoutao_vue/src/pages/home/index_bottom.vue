<template>
  <div class="bottom">
    <div class="buttons">
      <div class="item">
        <div class="button">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/cuxiao.png" alt>
        </div>
        <p>促销卖场</p>
      </div>
      <div class="item">
        <div class="button">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/chongzhi.png" alt>
        </div>
        <p>充值</p>
      </div>
      <div class="item">
        <div class="button">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/tuan.png" alt>
        </div>
        <p>团购</p>
      </div>
      <div class="item">
        <div class="button">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/caipiao.png" alt>
        </div>
        <p>彩票</p>
      </div>
      <div class="item">
        <div class="button" @click="$router.push('/order/myorder')">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/status.png" alt>
        </div>
        <p>订单状态</p>
      </div>
      <div class="item">
        <div class="button" @click="$router.push('/history')">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/history.png" alt>
        </div>
        <p>浏览历史</p>
      </div>
      <div class="item">
        <div class="button">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/focus.png" alt>
        </div>
        <p>我的关注</p>
      </div>
      <div class="item">
        <div class="button">
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/life.png" alt>
        </div>
        <p>生活娱乐</p>
      </div>
    </div>
    <div class="guang">逛</div>
    <div class="others">
      <div class="content">
        <van-card
          tag="免邮"
          :price="item.price"
          :desc="item.details"
          :title="item.gname"
          :thumb="item.imageUrl"
          v-for="(item,index) in items"
          :key="index"
          @click="toDeatail(item.gid)"
        >
          <div slot="footer">
            <span>{{item.sellNumber}}人付款</span>
          </div>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      items: [
        {
          imgUrl:
            'https://img.alicdn.com/imgextra/i4/47537911/TB2k1lrhmXlpuFjy0FeXXcJbFXa_!!47537911-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
          title: '限量的军绿色，帅气且硬汉风格十足。',
          price: 50
        },
        {
          imgUrl:
            'https://img.alicdn.com/imgextra/i4/47537911/TB2k1lrhmXlpuFjy0FeXXcJbFXa_!!47537911-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
          title: '限量的军绿色，帅气且硬汉风格十足。',
          price: 50
        },
        {
          imgUrl:
            'https://img.alicdn.com/imgextra/i4/47537911/TB2k1lrhmXlpuFjy0FeXXcJbFXa_!!47537911-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
          title: '限量的军绿色，帅气且硬汉风格十足。',
          price: 50
        }
      ]
    }
  },
  computed: {},
  methods: {
    getItem () {
      axios
        .get('http://localhost:8088/home')
        .then(this.getItemSuccess)
        .catch()
    },
    getItemSuccess (res) {
      console.log(res)
      this.items = res.data.r
    },
    toDeatail (id) {
      this.$router.push('/store/detail?gid=' + id)
    }
  },
  mounted () {
    this.getItem()
  }
}
</script>
<style lang="scss" scoped>
.bottom {
  width: 100%;
  z-index: 100;
  .buttons {
    height: 4.5rem;
    display: flex;
    flex-wrap: wrap;
    padding: 0.4rem;
    justify-content: space-between;
  }
  .item {
    width: 21%;
    height: 1.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;
    .button {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      border: 1px solid #ccc;
      margin-right: 0.4rem;
      line-height: 1.2rem;
      text-align: center;
      img {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
    p {
      margin-top: 0.2rem;
      margin-left: -0.15rem;
      text-align: center;
    }
  }
  .guang {
    text-align: center;
    font-size: 0.4rem;
    color: orange;
  }
  .content {
    padding-bottom: 1.2rem;
  }
  .van-card__price {
    font-size: .38rem
  }
  .van-cell-group {
    // position: fixed;
    // top: 1.5rem;
  }
  .van-card__desc {
    display: -webkit-box;
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space: normal;
    max-height: 2rem;
  }
//   .others {
//     width: 100%;
//     height: 3rem;
//     display: flex;
//     padding: 0.2rem;
//     box-sizing: border-box;
//     justify-content: space-between;
//     margin-bottom: 1.2rem;
//     div {
//       width: 30%;
//       height: 100%;
//       .img {
//         width: 100%;
//         height: 100%;
//         background: white;
//         line-height: 100%;
//         text-align: center;
//         img {
//           width: 80%;
//           height: 80%;
//         }
//       }
//       span {
//         color: red;
//         font-weight: bold;
//         font-size: 0.34rem;
//         margin-top: 0.2rem;
//         display: inline-block;
//       }
//     }
//   }
}
</style>
