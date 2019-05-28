<template>
<div class="main">
  <div class="root" v-if="uid">
    <van-nav-bar fixed title="浏览历史" left-text="返回"  @click-left="$router.go(-1)" left-arrow>
    </van-nav-bar>
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
  <toLogin v-else></toLogin>

</div>
</template>

<script>
import axios from 'axios'
import toLogin from '../common/toLogin'
export default {
  components: {
    toLogin
  },
  data () {
    return {
      imageURL:
        'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
      items: [],
      active: '',
      value: '',
      isShowSearch: false,
      uid: JSON.parse(localStorage.getItem('userId')),
      kwList: []
    }
  },
  computed: {},
  methods: {
    getItem () {
      axios
        .get('http://localhost:8088/history/getHistory?uid=' + this.uid)
        .then(this.getItemSuccess)
        .catch()
    },
    getItemSuccess (res) {
      console.log(res)
      let data = res.data.r
      let set = new Set()
      for (let i = 0; i < data.length; i++) {
        if (data[i].gid) {
          set.add(data[i])
        }
      }
      this.items = [...set]
      console.log(this.items)
    },
    toDeatail (id) {
      this.$router.push('/store/detail?gid=' + id)
    },
    itemSort (index, title) {
      console.log(index)
      if (index === 1) {
        this.items = this.items.sort((a, b) => a.price - b.price)
      } else if (index === 2) {
        this.items = this.items.sort((a, b) => b.price - a.price)
      } else if (index === 0) {
        this.getItem()
      }
    }
  },
  mounted () {
    this.getItem()
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
    left: 2.4rem;
    bottom: .1rem;
  }
  .content {
    padding-bottom: .3rem;
    margin-top: 46px;
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
}
.main {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.search {
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #f8f8f8;
    transform: translate(100%,0);
    transition: all .5s;
    header {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      padding: .2rem;
      .input {
        padding: .1rem .2rem;
        border-radius: .3rem;
        background: #fff;
        input {
          width: 55vw;
        }
      }
      .button {
        border-radius: .3rem;
      }
    }
    .history {
      width: 100%;
      height: 92vh;
      background-color: #fff;
      border-radius: .15rem;
      box-sizing: border-box;
      padding-top: .3rem;
      p
        {
          margin-bottom: .3rem;
        }
      .van-tag {
        min-width: .5rem;
        margin-left: .3rem;
        text-align: center;
      }
    }
  }
.searchTransfomr {
    transform: translate(0,0)
}
.van-nav-bar__text,.van-icon {
    color: #f8831e;
}
</style>
