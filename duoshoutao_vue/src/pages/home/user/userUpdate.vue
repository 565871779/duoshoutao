<template>
<div>
  <div class="root" v-if="uid">
      <van-cell is-link>
        <template slot="title">
        <div class="headLeft">
            <img src="@/assets/images/users/header.jpg" alt="用户头像">
            <span class="custom-text">无铭Emiya</span>
        </div>
        </template>
      </van-cell>
      <van-cell-group>
          <div></div>
      <van-cell title="性别" is-link @click="showSex=true" />
      <van-cell title="我的收货地址" is-link url="/address/addresslist" />
      <van-cell title="修改手机号" is-link url="/address/updateTel" />
      <van-cell title="修改密码" is-link url="/address/updatePs" />
      <van-cell title="注销用户" is-link @click="logout" />
      </van-cell-group>
      <van-popup v-model="showSex" position="bottom">
          <van-picker :columns="sexArr" show-toolbar @cancel="showSex=false" @confirm="changeSex" />
      </van-popup>
    </div>
    <toLogin v-else></toLogin>
    </div>

</template>
<style lang="scss" scoped>
.root {
    min-height: 100vh;
    background-color: #fbfbfb;
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
export default {
  components: {
    toLogin
  },
  data () {
    return {
      sexArr: ['男', '女'],
      showSex: false,
      sex: '',
      uid: JSON.parse(localStorage.getItem('userId'))
    }
  },
  computed: {},
  methods: {
    changeSex (val) {
      this.sex = val
    },
    logout () {
      localStorage.removeItem('userId')
      this.$router.go(0)
    }
  },
  mounted () {}
}
</script>
