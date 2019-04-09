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
             <img :src="categoryArr[chosedInd].img" alt="">
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
          name: '精品男装',
          img: 'https://img.alicdn.com/simba/img/TB1WhQTO7voK1RjSZPfSutPKFXa.jpg'
        },
        {
          name: '精致女装',
          img: 'https://img.alicdn.com/simba/img/TB1aRaVLxTpK1RjSZFKSuu2wXXa.jpg'
        },
        {
          name: '零食饮料',
          img: 'https://aecpm.alicdn.com/tfscom/TB1fkNhBYvpK1RjSZPiXXbmwXXa.jpg'
        },
        {
          name: '家用电器',
          img: 'https://img.alicdn.com/simba/img/TB1WhQTO7voK1RjSZPfSutPKFXa.jpg'
        },
        {
          name: '护肤美妆',
          img: 'https://img.alicdn.com/simba/img/TB1aRaVLxTpK1RjSZFKSuu2wXXa.jpg'
        },
        {
          name: '鲜花宠物',
          img: 'https://img.alicdn.com/simba/img/TB1WhQTO7voK1RjSZPfSutPKFXa.jpg'
        },
        {
          name: '生鲜水果',
          img: 'https://img.alicdn.com/simba/img/TB1aRaVLxTpK1RjSZFKSuu2wXXa.jpg'
        },
        {
          name: '鞋包配饰',
          img: 'https://img.alicdn.com/simba/img/TB1WhQTO7voK1RjSZPfSutPKFXa.jpg'
        },
        {
          name: '运动户外',
          img: 'https://aecpm.alicdn.com/tfscom/TB1fkNhBYvpK1RjSZPiXXbmwXXa.jpg'
        },
        {
          name: '图书音像',
          img: 'https://img.alicdn.com/simba/img/TB1aRaVLxTpK1RjSZFKSuu2wXXa.jpg'
        },
        {
          name: '手机数码',
          img: 'https://img.alicdn.com/simba/img/TB1WhQTO7voK1RjSZPfSutPKFXa.jpg'
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
      width: 27vw;
      max-height: calc(100vh - 1.2rem);
      overflow: scroll;
      div {
            display: block;
            overflow: hidden;
            font-size: 14px;
            line-height: 1.4;
            -webkit-user-select: none;
            user-select: none;
            color: #7d7e80;
            word-break: break-all;
            box-sizing: border-box;
            padding: 20px 12px 20px 9px;
            background-color: #f8f8f8;
            border-left: 3px solid transparent;
            &::after {
                  content: ' ';
                  position: absolute;
                  pointer-events: none;
                  box-sizing: border-box;
                  top: -50%;
                  left: -50%;
                  right: -50%;
                  bottom: -50%;
                  -webkit-transform: scale(0.5);
                  transform: scale(0.5);
                  border: 0 solid #ebedf0;
            }
      }
      .checked {
            font-weight: 500;
            color: #323233;
            border-color: #f44;
            background-color: #fff;
      }
    }
    .right {
      width: 72vw;
      height: calc(100vh - 1.2rem);
      .head {
        width: 100%;
        background: red;
        img {
          width: 100%;
        }
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
