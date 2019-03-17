<template>
  <div class="root">
      <div class="left">
        <div v-for="(item, index) in categoryArr" @click="choseClassfy(index,item.name)" :class="{checked: chosedInd === index}" :key="index">
          {{ item.name }}
        </div>
      </div>
      <div class="right">
          <!-- <div class="head">
          </div>
          <div class="bottom">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div> -->
           <div class="head">
          </div>
           <vue-better-scroll class="wrapper"
                         ref="scroll"
                         :pullUpLoad="pullUpLoadObj"
                         :startY="parseInt(startY)"
                         @pullingUp="onPullingUp">
        <ul class="bottom">
          <li class="item" v-for="(item,index) in items" :key="index" @click="linkTo(item.gid)">
            <img class="img" :src="item.imageUrl" alt="">
            <p>{{item.gname}}</p>
            </li>
        </ul>
      </vue-better-scroll>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
  },
  data () {
    return {
      chosedInd: 0,
      chosedName: '男装',
      categoryArr: [
        {
          name: '精品男装'
        },
        {
          name: '精致女装'
        },
        {
          name: '零食饮料'
        },
        {
          name: '家用电器'
        },
        {
          name: '护肤美妆'
        },
        {
          name: '鲜花宠物'
        },
        {
          name: '生鲜水果'
        },
        {
          name: '鞋包配饰'
        },
        {
          name: '运动户外'
        },
        {
          name: '图书音像'
        },
        {
          name: '手机数码'
        }
      ],
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '没有更多数据了'
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      page: 0

    }
  },
  computed: {},
  methods: {
    choseClassfy (ind, name) {
      this.chosedInd = ind
      this.chosedName = name
      if (name === '精品男装') {
        name = '男装'
      } else if (name === '精致女装') {
        name = '女装'
      }
      this.items = []
      this.page = 0
      this.getCategoryInfo(name)
    },
    getCategoryInfo (name) {
      this.page++
      axios.get('http://localhost:8088/category?name=' + name + '&page=' + this.page)
        .then(this.getCategoryInfoSucess).catch((err) => { console.log(err) })
    },
    getCategoryInfoSucess (res) {
      console.log(res)
      this.items = [...this.items, ...res.data.r]
      this.$refs.scroll.forceUpdate(true)
    },
    scrollTo () {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
    },
    // 模拟数据请求
    getData () {

    },
    onPullingUp () {
      // 模拟上拉 加载更多数据
      this.getCategoryInfo(this.chosedName)
      console.log('上拉加载')
    },
    linkTo (id) {
      this.$router.push('/store/detail?gid=' + id)
    }
  },
  mounted () {
    this.getCategoryInfo('男装')
  }
}
</script>
<style lang="scss" scoped>
.root{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    .left {
      width: 25vw;
      max-height: 100vh;
      overflow: scroll;
      div {
        height: 12.3%;
        border-bottom: 1px solid #333;
        width: 100%;
        text-align: center;
        line-height: 12.3vh;
        color: #666;
        background: #d6d6d6;
        font-weight: bold;
        font-size: .34rem
      }
      .checked {
        background: #fff;
        color: orangered;
      }
    }
    .right {
      width: 75vw;
      .head {
        width: 100%;
        height: 2.5rem;
        background: red;
      }
      .bottom {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1.2rem;
      .item {
          width: 42%;
          height: 2.7rem;
          margin: .2rem;
          img {
            width: 100%;
          }
          p {
            text-align: center;
            margin-top: .1rem;
          }
        }
      }
    }
}
</style>
