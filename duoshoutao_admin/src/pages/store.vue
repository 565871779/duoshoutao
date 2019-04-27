<template>
  <div class="root">
    <Aside></Aside>
    <div class="content">
      <el-button type="primary" @click="toStoreEdit(0)">新增店铺</el-button>
      <el-card class="box-card" v-for="(item,index) in storeList" :key="index">
        <div slot="header" class="clearfix">
          <span>{{item.sname}}</span>
            <el-button style="float: right;position:relative;bottom:13px" type="primary" icon="el-icon-edit" @click="toStoreEdit(item.sid)" circle></el-button>
        </div>
        <div class="text item">
          <header>
            <img :src="item.imageUrl" alt>
          </header>
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
      </el-card>
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
      this.$axios
        .get('http://localhost:8088/admin/store/getStoreList?uid=' + this.uid)
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
.root {
  margin-left: 20vw;
  .content {
    width: 600px;
    .el-card {
      margin-top: 10px;
      .el-card__header {
        span {
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
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
      margin: 12px;

      p {
        margin-right: 20px;
      }
      span {
      }
    }
  }
}
</style>
