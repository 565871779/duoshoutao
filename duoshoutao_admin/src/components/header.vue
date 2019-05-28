<template>
  <div class="root">
    <el-header>
      <div class="left">剁手淘商家管理系统</div>
      <div class="right">
        <div class="head">
          <img :src="imageUrl" alt>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" @click.native="toUserCenter">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-plus" @click.native="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" @click.native="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      uid: JSON.parse(localStorage.getItem('userId')),
      name: '',
      imageUrl: ''
    }
  },
  computed: {},
  methods: {
    toUserCenter () {
      this.$router.push('/userCenter')
    },
    updatePassword () {
      this.$router.push('/updatePaw')
    },
    getUserInfo () {
      this.$axios.get('http://localhost:8088/admin/userCenter/getUserInfo?uid=' + this.uid)
        .then((res) => {
          console.log(res)
          let data = res.data.r[0]
          this.name = data.uname
          this.imageUrl = data.uhead
        })
    },
    logOut () {
      localStorage.removeItem('userId')
      localStorage.removeItem('admin')
      this.$router.go(0)
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.root {
  // .el-header {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  // }
  background: #fff;
  .left {
    font-size: 30px;
    color: #f8831e;
    line-height: 0;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      width: 120px;
      display: flex;
      align-items: center;
      .head {
          margin-right: 10px;
        img {
          width: 30px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
