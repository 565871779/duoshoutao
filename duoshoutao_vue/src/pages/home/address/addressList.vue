<template>
  <div class="root">
    <div class="noaddress" v-if="list.length === 0">
      <img src="@/assets/images/users/noaddress.png" alt>
      <p>一个收获地址也没有</p>
      <span style="margin-top: 0.3rem">"快去新增收获地址，买买买吧"</span>
      <button
      @click="onAdd"
        class="van-button van-button--danger van-button--large van-button--square van-address-list__add"
      >
        <span  class="van-button__text .van-address-list__add">新增地址</span>
      </button>
    </div>
    <div v-else>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @click.native="choseAddress"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        }
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ],
      isFromOrder: false
    }
  },

  methods: {
    onAdd () {
      this.$router.push('/address/addressAdd')
    },

    onEdit (item, index) {
      this.$router.push('/address/addressAdd?aid=' + item.id)
    },
    choseAddress () {
      if (this.isFromOrder) {
        localStorage.setItem('choseAid', this.chosenAddressId)
        this.$router.go(-1)
      }
    },
    getAddressList () {
      axios
        .get('http://localhost:8088/address/getAddressList?uid=' + JSON.parse(localStorage.getItem('userId')))
        .then(this.getAddressListSuccess)
        .catch()
    },
    getAddressListSuccess (res) {
      console.log(res)
      let data = res.data.r
      for (let i = 0; i < data.length; i++) {
        this.list[i] = {}
        this.list[i].id = data[i].aid
        this.list[i].name = data[i].sname
        this.list[i].tel = data[i].sphone
        this.list[i].address = data[i].detailadd
        if (data[i].isdefault === 1) {
          this.chosenAddressId = data[i].aid
        }
      }
    }
  },
  mounted () {
    this.getAddressList()
    console.log(this.$route.matched)
  },
  beforeRouteEnter (to, from, next) {
    console.log(from)
    next(vm => {
      if (from.name === 'createOrder') {
        vm.isFromOrder = true
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.root {
  .noaddress {
    width: 100%;
    img {
      width: 25%;
      display: block;
      margin: 2rem auto;
      margin-bottom: 0.8rem;
    }
    p {
      text-align: center;
    }
    span {
      display: block;
      text-align: center;
    }
  }
}
</style>
