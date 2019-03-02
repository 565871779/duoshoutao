<template>
  <div class="bottom">
      <div class="buttons">
          <div class="item">
              <div class="button">
                  <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/cuxiao.png" alt="">
              </div>
              <p>促销卖场</p>
          </div>
          <div class="item">
              <div class="button">
                 <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/chongzhi.png" alt="">
              </div>
              <p>重置</p>
          </div>
           <div class="item">
              <div class="button">
                  <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/tuan.png" alt="">
              </div>
              <p>团购</p>
          </div>
           <div class="item">
              <div class="button">
                 <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/caipiao.png" alt="">
              </div>
              <p>彩票</p>
          </div>
           <div class="item">
              <div class="button">
                 <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/status.png" alt="">
              </div>
              <p>订单状态</p>
          </div>
           <div class="item">
              <div class="button">
                 <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/history.png" alt="">
              </div>
              <p>浏览历史</p>
          </div>
           <div class="item">
              <div class="button">
                 <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/focus.png" alt="">
              </div>
              <p>我的关注</p>
          </div>
           <div class="item">
              <div class="button">
                 <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-class/life.png" alt="">
              </div>
              <p>生活娱乐</p>
          </div>
      </div>
      <div class="guang">
          逛
      </div>
      <div class="others">
          <div v-for="(item, index) in otherItem" :key="index">
              <div class="img">
              <img :src="item.imgUrl" alt="">
              <span>
                  {{item.price}}
              </span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      otherItem: [
        {
          imgUrl: 'https://img.alicdn.com/imgextra/i4/47537911/TB2k1lrhmXlpuFjy0FeXXcJbFXa_!!47537911-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
          title: '限量的军绿色，帅气且硬汉风格十足。',
          price: 50
        },
        {
          imgUrl: 'https://img.alicdn.com/imgextra/i4/47537911/TB2k1lrhmXlpuFjy0FeXXcJbFXa_!!47537911-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
          title: '限量的军绿色，帅气且硬汉风格十足。',
          price: 50
        },
        {
          imgUrl: 'https://img.alicdn.com/imgextra/i4/47537911/TB2k1lrhmXlpuFjy0FeXXcJbFXa_!!47537911-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
          title: '限量的军绿色，帅气且硬汉风格十足。',
          price: 50
        }
      ]
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.bottom{
    width: 100%;
    .buttons {
        height: 4.5rem;
        display: flex;
        flex-wrap: wrap;
        padding: .4rem;
        justify-content: space-between;
    }
    .item {
        width: 21%;
        height: 1.2rem;
        margin-top: .5rem;
        margin-bottom: .3rem;
        .button {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: 1px solid #ccc;
            margin-right: .4rem;
            line-height: 1.2rem;
            text-align: center;
            img {
                width: .8rem;
                height: .8rem;
            }
        }
        p {
            margin-top: .2rem;
            margin-left: -.15rem;
            text-align: center;
        }
    }
    .guang {
        text-align: center;
        font-size: .4rem;
        color: orange;
    }
    .others {
        width: 100%;
        height: 3rem;
        display: flex;
        padding: .2rem;
        box-sizing: border-box;
        justify-content: space-between;
        margin-bottom: 1.2rem;
        div {
            width: 30%;
            height: 100%;
            .img {
                width: 100%;
                height: 100%;
                background: white;
                line-height: 100%;
                text-align: center;
                img {
                    width: 80%;
                    height: 80%;
                 }
            }
            span {
                color: red;
                font-weight: bold;
                font-size: .34rem;
                margin-top: .2rem;
                display: inline-block
            }
        }
    }
}
</style>
