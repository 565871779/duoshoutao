<template>
  <div class="main">
    <van-nav-bar fixed title="搜索结果" left-text="返回" @click-right="toSearch" left-arrow>
      <van-icon name="search" slot="right"/>
    </van-nav-bar>
    <van-tabs v-model="active" @click="itemSort">
      <van-tab title="综合" index="1"></van-tab>
      <van-tab title="价格升序" index="2"></van-tab>
      <van-tab title="价格降序" index="3"></van-tab>
      <van-tab title="搜索店铺" index="4"></van-tab>
    </van-tabs>
    <div class="root" v-if="!isSearchStore">
      <div class="content" v-if="items.length > 0">
        <van-card
          tag="免邮"
          :price="item.price"
          :desc="item.details"
          :title="item.gname"
          :thumb="item.imageUrl"
          v-for="(item,index) in items"
          :key="index"
          @click="searchToDeatail(item.gid)"
        >
          <div slot="footer">
            <span>{{item.sellNumber}}人付款</span>
          </div>
        </van-card>
      </div>
      <div class="noitem" v-else>
        <div>
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/logo.png" alt="">
            <p>暂无搜索结果，建议换个关键词试试~</p>
        </div>
      </div>
    </div>
    <div class="store" v-else>
      <div v-if="storeList.length > 0">
        <div class="item"
        @click="$router.push('/store?sid=' + item.sid)"
        v-for="(item,index) in storeList"
        :key="index"
      >
        <div class="info">
          <div class="head">
            <img :src="item.imageUrl" alt>
          </div>
          <div class="name">
            {{item.sname}}
            <div class="fans">{{item.fans}} 粉丝</div>
          </div>
          <div class="attention">
            <van-button size="mini" type="warning">进店</van-button>
          </div>
        </div>
        <div class="content">
          <div class="title">{{item.title}}</div>
          <div class="text">{{item.detail}}</div>
          <div class="img">
            <img v-for="(img,ind) in item.children" :key="ind" :src="img.imageUrl" alt>
          </div>
        </div>
      </div>
      </div>
      <div class="noitem" v-else>
        <div>
          <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/logo.png" alt="">
            <p>暂无搜索结果，建议换个关键词试试~</p>
        </div>
      </div>
    </div>
    <div class="search" :class="{'searchTransfomr': isShowSearch}">
      <header>
        <div @click="isShowSearch=false">取消</div>
        <div class="input">
          <input type="text" v-model="kw">
        </div>
        <div class="button">
          <van-button round type="danger" @click="search" size="small">搜索</van-button>
        </div>
      </header>
      <div class="history">
        <p>历史搜索</p>
        <van-tag plain v-for="(item,index) in kwList" @click="checkKw(item)" :key="index">{{item}}</van-tag>
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
      imageURL:
        'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
      kw: this.$route.query.kw,
      items: [],
      active: '',
      value: '',
      isShowSearch: false,
      uid: JSON.parse(localStorage.getItem('userId')),
      kwList: [],
      isSearchStore: false,
      storeList: []
    }
  },
  computed: {},
  methods: {
    checkKw (kw) {
      this.kw = kw
      this.getItem()
      this.isShowSearch = false
    },
    getItem () {
      axios
        .get('http://localhost:8088/search?kw=' + this.kw + '&uid=' + this.uid)
        .then(this.getItemSuccess)
    },
    getItemSuccess (res) {
      console.log(res)
      this.items = res.data.r
    },
    searchToDeatail (id) {
      this.$router.push('/store/detail?gid=' + id)
    },
    itemSort (index, title) {
      console.log(index)
      if (index === 1) {
        this.isSearchStore = false
        this.items = this.items.sort((a, b) => a.price - b.price)
      } else if (index === 2) {
        this.isSearchStore = false
        this.items = this.items.sort((a, b) => b.price - a.price)
      } else if (index === 0) {
        this.isSearchStore = false
        this.getItem()
      } else {
        this.isSearchStore = true
        this.searchStore()
      }
    },
    toSearch () {
      this.getHistory()
      this.isShowSearch = true
    },
    getHistory () {
      axios
        .get('http://localhost:8088/search/getHistory?uid=' + this.uid)
        .then(this.getHistorySuccess)
        .catch()
    },
    getHistorySuccess (res) {
      console.log(res)
      let data = res.data.r
      let set = new Set()
      for (let i = 0; i < data.length; i++) {
        if (data[i].kw !== 'undefined') {
          set.add(data[i].kw)
        }
      }
      this.kwList = [...set]
      console.log(this.kwList)
    },
    searchStore () {
      axios
        .get(
          'http://localhost:8088/search/searchStore?kw=' +
            this.kw +
            '&uid=' +
            this.uid
        )
        .then(res => {
          console.log(res)
          this.storeList = res.data.r
        })
    },
    search () {
      if (this.isSearchStore) {
        this.searchStore()
      } else {
        this.getItem()
      }
      this.isShowSearch = false
    }
  },
  mounted () {
    this.getItem()
    this.getHistory()
  }
}
</script>
<style lang="scss" scoped>
.root {
  .card__footer {
    padding-top: 10px;
  }
  .card__tags {
    .van-tag {
      margin-right: 5px;
    }
  }
  .van-card__footer {
    position: absolute;
    left: 3.5rem;
    top: 1.3rem;
  }
  .content {
    padding-bottom: 0.3rem;
  }
  .van-card__price {
    font-size: 0.38rem;
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
}
.main {
  width: 100%;
  overflow: hidden;
  background: #f7f7f7;
  min-height: 100vh;
  .noitem {
    min-height: calc(100vh - 90px);
    background: #fff;
    display: flex;
    justify-content: center;
    div {
      margin-top: 1.5rem;
      img {
        display: block;
        margin: .8rem auto;
      }
    }
  }
  .van-tabs {
    margin-top: 46px;
  }
  .store {
  }
  .item {
    width: 94%;
    margin: 0.2rem auto;
    background-color: #fff;
    padding: 0.2rem;
    box-sizing: border-box;
    border-radius: 0.15rem;
    .info {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      .head {
        width: 0.8rem;
        height: 0.8rem;
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
        height: 0.8rem;
        margin-right: 2rem;
        margin-top: 0.15rem;
        height: 0.6rem;
        .fans {
          font-size: 0.24rem;
          color: #ccc;
        }
      }
    }
    .content {
      margin-top: 0.3rem;
      font-size: 0.32rem;
      .img {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        img {
          width: 28vw;
          height: 28vw;
          margin-top: 0.2rem;
        }
      }
    }
  }
}
.search {
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #f8f8f8;
  transform: translate(100%, 0);
  transition: all 0.5s;
  header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 0.2rem;
    .input {
      padding: 0.1rem 0.2rem;
      border-radius: 0.3rem;
      background: #fff;
      input {
        width: 55vw;
      }
    }
    .button {
      border-radius: 0.3rem;
    }
  }
  .history {
    width: 100%;
    height: 92vh;
    background-color: #fff;
    border-radius: 0.15rem;
    box-sizing: border-box;
    padding-top: 0.3rem;
    p {
      margin-bottom: 0.3rem;
    }
    .van-tag {
      min-width: 0.5rem;
      margin-left: 0.3rem;
      text-align: center;
    }
  }
}
.searchTransfomr {
  transform: translate(0, 0);
}
</style>
