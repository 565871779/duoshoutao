<template>
  <div class="root">
    <Aside></Aside>
    <div class="content">
             <el-button type="primary" @click="toStoreEdit">新增店铺</el-button>
        <div class="body" v-for="(item,index) in storeList" :key="index">
            <header>
                <img :src="item.imageUrl" alt="">
                <el-button type="primary" icon="el-icon-edit" @click="toStoreEdit(item.sid)" circle></el-button>
            </header>
            <div class="items">
                <p>店铺名称:</p>
                <span>{{item.sname}}</span>
            </div>
            <div class="items">
                <p>店铺描述</p>
                <span>{{item.detail}}</span>
            </div>
            <div class="items">
                <p>店铺收藏人数</p>
                <span>{{item.fans}}</span>
            </div>
            <div class="items">
                <p>店铺销售额</p>
                <span>￥{{item.selled}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/aside'
export default {
  components: {
    Aside
  },
  data () {
    return {
      uid: JSON.parse(localStorage.getItem('userId')),
      storeList: [
        {
          name: '',
          detail: '',
          imageUrl: '',
          selled: '',
          fans: ''
        }
      ]
    }
  },
  computed: {},
  methods: {
    getStoreInfo () {
      this.$axios.get('http://localhost:8088/admin/store/getStoreList?uid=' + this.uid)
        .then(res => {
          console.log(res)
          let data = res.data.r
          this.storeList = data
        })
    },
    toStoreEdit (id) {
      if (this.storeList.length >= 3) {
        this.$message({
          showClose: true,
          message: '最多开设3个店铺哦',
          type: 'error'
        })
        return
      }
      if (id) {
        this.$router.push('/storeEdit?sid=' + id)
      } else {
        this.$router.push('/storeEdit')
      }
    }
  },
  mounted () {
    this.getStoreInfo()
  }
}
</script>
<style lang="scss" scoped>
.root{
    margin-left: 20vw;
    .content {
        .body {
            margin-top: 20px;
            border: 1px solid #ccc;
            width: 420px;
            padding: 10px;
            box-sizing: border-box;
        }
        header {
            width: 400px;
            position: relative;
            .el-button--primary {
                position: absolute;
                top: 0;
                right: 0;
            }
            img {
                width: 100px;
            }
        }
        .items {
            width: 400px;
            display: flex;
            align-items: center;
            p {
                margin-right: 20px;
            }
            span {

            }
        }
    }
}
</style>
