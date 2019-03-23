<template>
  <div class="root">
     <div class="item" v-for="(item,index) in findList" :key="index">
       <div class="header">
         <p>您可能感兴趣的内容</p>
         <div class="close">
           <van-icon name="close" size=".4rem" />
           </div>
       </div>
       <div class="info">
         <div class="head">
           <img src="https://img.alicdn.com/bao/uploaded/i1/TB1ODB0J7zoK1RjSZFlSuui4VXa.jpg_190x190Q75s0.jpg_.webp" alt="">
         </div>
         <div class="name">
           {{item.gname}}
           <div class="fans">
             19.5万粉丝
           </div>
         </div>
         <div class="attention">
           关注
         </div>
       </div>
       <div class="content">
         <div class="title">
           {{item.title}}
         </div>
         <div class="text">
           {{item.content}}
         </div>
         <div class="img">
           <img  v-for="(img,ind) in 3" :key="ind" :src="item.imageUrl" alt="">
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
import axios from 'axios'
export default {
  components: {
    [Icon.name]: Icon
  },
  data () {
    return {
      uid: JSON.parse(localStorage.getItem('userId')),
      type: 0,
      findList: []
    }
  },
  computed: {},
  methods: {
    getUserInfo () {
      axios.get('http://localhost:8088/userCenter/getUserInfo?uid=' + this.uid)
        .then(this.getUserInfoSucc)
        .catch()
    },
    getUserInfoSucc (res) {
      console.log(res)
      let data = res.data.r[0]
      this.type = data.usex
      this.getFindList()
    },
    getFindList () {
      axios.get('http://localhost:8088/find?type=' + this.type)
        .then(this.getFindListSucc)
    },
    getFindListSucc (res) {
      console.log(res)
      this.findList = res.data.r
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.root{
  width: 100%;
  background-color: #f7f7f7;
  border-top: 1px solid #f7f7f7;
  min-height: 100vh;
  .item {
    width: 94%;
    margin: .2rem auto;
    background-color: #fff;
    padding: .2rem;
    box-sizing: border-box;
    border-radius: .15rem;
    .header {
      color: #ccc;
      display: flex;
      justify-content: space-between;
      font-size: .24rem;
      .close {
        width: .5rem;
        height: .5rem;
      }
    }
    .info {
      margin-top: .2rem;
      display: flex;
      justify-content: space-between;
      .head {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
          width: 3rem;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          height: .8rem;
          margin-right: 2rem;
          margin-top: .15rem;
          height: .6rem;
          .fans {
            font-size: .24rem;
            color: #ccc;
          }
      }
    }
    .content {
        margin-top: .3rem;
        font-size: .32rem;
        .img {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          img {
            width: 28vw;
            height: 28vw;
            margin-top: .2rem;
          }
        }
      }
  }
}
</style>
