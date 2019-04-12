<template>
  <div class="root">
      <div class="item">
       <div class="info">
         <div class="head">
           <img :src="imgUrl" alt="">
         </div>
         <div class="name">
           {{sname}}
           <div class="fans">
             {{sfans}} 粉丝
           </div>
         </div>
         <div class="attention">
           <van-tag plain type="danger" @click.native="fanStore" v-if="status === 0">关注</van-tag>
           <van-tag plain type="danger" @click.native="cancelFanStore" v-else>取消关注</van-tag>
         </div>
       </div>
       <div class="content">
         <div class="text">
           {{detail}}
         </div>
         <van-search placeholder="请输入搜索关键词"  @search="onSearch" v-model="value"/>
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
      findList: [],
      items: [],
      sid: this.$route.query.sid,
      sname: '',
      sfans: '',
      detail: '',
      imgUrl: '',
      status: '', // 是否收藏 0：否 1：是
      value: ''
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
    },
    getStoreDetail () {
      axios.get('http://localhost:8088/store/getStoreDetail?sid=' + this.sid)
        .then(this.getStoreDetailSucc)
    },
    getStoreDetailSucc (res) {
      console.log(res)
      let data = res.data.r[0]
      this.sname = data.sname
      this.sfans = data.fans
      this.detail = data.detail
      this.imgUrl = data.imageUrl
    },
    getItem () {
      axios
        .get('http://localhost:8088/store/home?sid=' + this.sid)
        .then(this.getItemSuccess)
    },
    getItemSuccess (res) {
      console.log(res)
      this.items = res.data.r
    },
    toDeatail (id) {
      this.$router.push('/store/detail?gid=' + id)
    },
    fanStore () {
      axios.get('http://localhost:8088/store/fan?uid=' + this.uid + '&sid=' + this.sid)
        .then(res => {
          console.log(res)
          if (res.data.r === 'ok') {
            this.status = 1
            this.getStoreDetail()
          }
        })
    },
    cancelFanStore () {
      axios.get('http://localhost:8088/store/cancelfan?uid=' + this.uid + '&sid=' + this.sid)
        .then(res => {
          console.log(res)
          if (res.data.r === 'ok') {
            this.status = 0
            this.getStoreDetail()
          }
        })
    },
    checkFans () {
      axios.get('http://localhost:8088/store/checkfans?uid=' + this.uid + '&sid=' + this.sid)
        .then(res => {
          console.log(res)
          let data = res.data.r
          if (data.length === 0) {
            this.status = 0
          } else {
            this.status = 1
          }
        })
    },
    onSearch (val) {
      axios.get('http://localhost:8088/store/search?sid=' + this.sid + '&kw=' + val)
        .then(res => {
          console.log(res)
          this.items = res.data.r
        })
    }
  },
  mounted () {
    this.getUserInfo()
    this.getStoreDetail()
    this.getItem()
    this.checkFans()
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
    min-height: 100vh;
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
