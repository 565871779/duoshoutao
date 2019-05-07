<template>
  <div>
    <div class="root" v-if="uid">
      <van-uploader name="images" :after-read="onRead"  accept="image/gif, image/jpeg" >
        <van-cell is-link>
          <template slot="title">
            <div class="headLeft">
              <img :src="imgUrl" alt="用户头像">
              <span class="custom-text">{{uname}}</span>
            </div>
          </template>
        </van-cell>
      </van-uploader>
      <van-cell-group>
        <div></div>
        <van-cell title="性别" is-link @click="showSex=true"/>
        <van-cell title="我的收货地址" is-link url="/address/addresslist"/>
        <van-cell title="修改密码" is-link url="/address/updatePs"/>
        <van-cell title="注销用户" is-link @click="logout"/>
      </van-cell-group>
      <van-popup v-model="showSex" position="bottom">
        <van-picker :columns="sexArr" show-toolbar @cancel="showSex=false" @confirm="changeSex"/>
      </van-popup>
    </div>
    <toLogin v-else></toLogin>
  </div>
</template>
<style lang="scss" scoped>
.root {
  min-height: 100vh;
  background-color: #fbfbfb;
  .van-cell {
    width: 100vw;
  }
  .headLeft {
    font-size: 17px;
    font-weight: 500;
    font-family: "微软雅黑";
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .van-cell:first-child .van-cell__right-icon {
    margin-top: 15px;
  }
  .van-cell-group {
    margin-top: 40px;
    .van-cell {
      margin-top: 10px;
    }
  }
}
</style>
<script>
import toLogin from '../common/toLogin'
import axios from 'axios'
export default {
  components: {
    toLogin
  },
  data () {
    return {
      sexArr: ['男', '女'],
      showSex: false,
      sex: '',
      uid: JSON.parse(localStorage.getItem('userId')),
      imgUrl: '@/assets/images/users/header.jpg',
      uname: ''
    }
  },
  computed: {},
  methods: {
    changeSex (val) {
      this.sex = val
      let par = {}
      par.usex = val === '男' ? 1 : 0
      par.uid = this.uid
      axios.post('http://localhost:8088/userCenter/changeSex', par)
        .then(res => {
          console.log(res)
          if (res.data.r === 'ok') {
            this.$toast.success({
              mask: true,
              message: '修改性别成功'
            })
          }
        })
    },
    logout () {
      localStorage.removeItem('userId')
      this.$router.go(0)
    },
    onRead (file, detail) {
      let params = new FormData() // 创建form对象
      params.append('images', file.file) // 通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      axios.post('http://localhost:8088/uploads', params).then(res => {
        console.log(res)
        this.imgUrl = res.data.data[0]
        let par = {img: this.imgUrl}
        par.uid = this.uid
        axios.post('http://localhost:8088/userCenter/updateHead', par)
          .then(res => {
            console.log(res)
          })
      }).catch(err => {
        console.log(err)
      })
    },
    getUserInfo () {
      axios.get('http://localhost:8088/userCenter/getUserInfo?uid=' + this.uid).then((res) => {
        console.log(res)
        let data = res.data.r[0]
        this.imgUrl = data.uhead
        this.uname = data.uname
        this.sex = data.usex === 1 ? '男' : '女'
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
