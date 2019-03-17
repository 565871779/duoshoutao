<template>
  <div class="root">
    <div class="top">
      <div class="header">
        <div class="title">
          <p>剁手淘</p>
          <span>Duoshoutao</span>
        </div>
        <div class="search">
          <input @keydown="toSearch" type="text" placeholder="搜索剁手淘商品" v-model="kw">
          <img src="@/assets/images/luyin.png" alt>
        </div>
      </div>
    </div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-slide/slide-1.jpg" alt>
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-slide/slide-2.jpg" alt>
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-slide/slide-3.jpg" alt>
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-slide/slide-4.jpg" alt>
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-slide/slide-5.jpg" alt>
      </van-swipe-item>
    </van-swipe>
    <div class="cuxiao">
      <div class="shopImg">
        <img
          src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/goods/%E6%8A%A4%E8%82%A4%E7%BE%8E%E5%A6%86/meizhuang-10.jpg"
          alt
        >
      </div>
      <div class="detail">
        <p class="sizeBig">还剩
          <span>00</span>时
          <span>{{minutes}}</span>分
          <span>{{seconds}}</span>秒
        </p>
        <p class="grey">秒杀价：
          <span class="sizeBig">￥19.0</span>
        </p>
        <p class="grey">原价：
          <del>￥190</del>
        </p>
      </div>
      <p class="sizeBig miaosha">快速秒杀
        <span class="grey">&nbsp;></span>
      </p>
    </div>
    <bottom></bottom>
  </div>
</template>
<style lang="scss" scoped>
.root {
  .top {
    .header {
      width: 100%;
      display: flex;
      background-color: #d51c2b;
      height: 60px;
      align-items: center;
      padding-left: 8px;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      z-index: 5;
      .title {
        font-size: 22px;
        font-weight: 600;
        text-align: center;
        p {
          background-image: -webkit-linear-gradient(
            bottom,
            #828277,
            #e3dfdf,
            #eee
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        span {
          background-image: -webkit-linear-gradient(
            bottom,
            #828277,
            #e3dfdf,
            #eee
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .search {
        margin-left: 15px;
        width: 216px;
        height: 40px;
        border-radius: 5px;
        background-color: #fff;
        input {
          height: 100%;
          width: 175px;
          margin-left: 5px;
        }
      }
    }
  }
  .slider {
    width: 100%;
    height: 100px;
    border: 1px solid red;
  }
  .van-swipe {
    margin-top: 60px;
    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 145px;
        }
      }
    }
  }
  .cuxiao {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    .shopImg {
      width: 100px;
      height: 100px;
      margin-right: 8px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      height: 100px;
      color: black;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 16px 20px 16px 0;
      box-sizing: border-box;
      span {
        color: red;
      }
    }
    .sizeBig {
      font-weight: bold;
      font-size: 16px;
    }
    .grey {
      color: #8c8686;
      del {
        text-decoration: line-through;
      }
    }
    .miaosha {
      font-size: 22px;
    }
  }
}
</style>
<script>
import bottom from './index_bottom'
import { Lazyload } from 'vant'
export default {
  components: {
    bottom,
    Lazyload
  },
  data () {
    return {
      value: '',
      images: ['https://img.yzcdn.cn/1.jpg', 'https://img.yzcdn.cn/2.jpg'],
      seconds: 50,
      minutes: 43,
      kw: ''
    }
  },
  computed: {},
  methods: {
    setTime () {
      setInterval(() => {
        this.seconds--
        if (this.seconds === 0) {
          this.seconds = 60
          this.minutes--
        }
      }, 1000)
    },
    toSearch (kw) {
      console.log(kw)
      if (kw.key === 'Enter') {
        this.$router.push('./search?kw=' + this.kw)
      }
    }
  },
  mounted () {
    this.setTime()
  }
}
</script>
