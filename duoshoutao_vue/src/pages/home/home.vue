<template>
  <div class="root">
      <router-view></router-view>
      <div class="bottom-bar">
          <div :class="pageStatus === 0? 'home-active':'home'" @click="clickTip(0)">首页</div>
          <div :class="pageStatus === 1? 'find-active':'find'" @click="clickTip(1)">发现</div>
          <div :class="pageStatus === 2? 'category-active':'category'" @click="clickTip(2)"> 分类</div>
          <div :class="pageStatus === 3? 'shopcar-active':'shopcar'" @click="clickTip(3)"> 购物车</div>
          <div :class="pageStatus === 4? 'mine-active':'mine'" @click="clickTip(4)"> 我的</div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      pageStatus: 0
    }
  },
  computed: {},
  methods: {
    toCategory () {
      this.$router.push('/home/category')
    },
    clickTip (ind) {
      this.pageStatus = ind
      if (ind === 0) {
        localStorage.setItem('bottomClick', 0)
        this.$router.push('/home')
      } else if (ind === 1) {
        localStorage.setItem('bottomClick', 1)
        this.$router.push('/home/find')
      } else if (ind === 2) {
        localStorage.setItem('bottomClick', 2)
        this.$router.push('/home/category')
      } else if (ind === 3) {
        localStorage.setItem('bottomClick', 3)
        this.$router.push('/home/shopcar')
      } else {
        localStorage.setItem('bottomClick', 4)
        this.$router.push('/home/mine')
      }
    }
  },
  created () {
    if (window.location.href.includes('find')) {
      localStorage.setItem('bottomClick', 1)
    } else if (window.location.href.includes('category')) {
      localStorage.setItem('bottomClick', 2)
    } else if (window.location.href.includes('shopCar')) {
      localStorage.setItem('bottomClick', 3)
    } else if (window.location.href.includes('mine')) {
      localStorage.setItem('bottomClick', 4)
    } else {
      localStorage.setItem('bottomClick', 0)
    }
    this.pageStatus = JSON.parse(localStorage.getItem('bottomClick'))
  }
}
</script>
<style lang="scss" scoped>

.root{
    .bottom-bar{
        width: 100%;
        border: 1px solid #e3e3e3;
        padding-top:.04rem;
        bottom: 0;
        background: rgba(255,255,255, 1);
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        div {
            width: 1.5rem;
            line-height: 1.9rem;
            height: 1.2rem;
            text-align: center;
            font-size: .32rem;
            background-repeat: no-repeat;
            background-position: .45rem .1rem;
            background-size: .55rem .55rem;
        }
        .home {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/home.png');
        }
        .home-active {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/home_click.png');
        }
        .find {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/find.png');
        }
        .find-active {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/find_click.png');
        }
        .category {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/cartgory.png');
        }
        .category-active {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/cartgory_click.png');
        }
        .shopcar {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/cart.png');
        }
        .shopcar-active {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/cart_click.png');
        }
        .mine {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/my.png');
        }
        .mine-active {
            background-image: url('http://duoshoutao.oss-cn-beijing.aliyuncs.com/index-bottom/my_click.png');
        }
    }
}
</style>
