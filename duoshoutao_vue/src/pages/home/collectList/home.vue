<template>
<div>
  <div class="root" v-if="uid">
       <van-nav-bar
        title="我的关注"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
        />
      <div class="noList" v-if="list.length === 0">
          <div class="img">
              <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/index/collectList.png" alt="">
          </div>
          <p>您暂时还没有关注任何店铺哦</p>
      </div>
      <div class="list"  v-else>

        <div class="item" v-for="(item,index) in list" :key="index" @click="toStore(item.sid)">
            <div class="icon">
                <img :src="item.imageUrl" alt="">
            </div>
            <div class="text">
                {{item.sname}}
            </div>
        </div>
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
      uid: JSON.parse(localStorage.getItem('userId')),
      list: []
    }
  },
  computed: {},
  methods: {
    getCollectList () {
      axios.get('http://localhost:8088/store/getCollectList?uid=' + this.uid)
        .then(res => {
          console.log(res)
          this.list = res.data.r
        })
    },
    toStore (id) {
      this.$router.push('/store?sid=' + id)
    }
  },
  mounted () {
    this.getCollectList()
  }
}
</script>
<style lang="scss" scoped>
.root{
    .noList {
        .img {
            width: 50%;
            margin:  1rem auto;
            img {
                width: 100%;
            }
        }
        p {
            text-align: center;
            font-size: .34rem;
        }
    }
    .item {
        display: flex;
        align-items: center;
        margin: .2rem;
        padding: .2rem 0;
        border-bottom: 1px solid #ccc;

        .icon {
            width: 1rem;
            img {
                width: 100%;
                border-radius: 50%;
            }

        }
        .text {
                margin-left: .5rem;
            }
    }
}
.van-nav-bar__text,.van-icon {
    color: #f8831e;
}
</style>
