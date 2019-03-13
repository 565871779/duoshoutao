<template>
  <div class="root">
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-postal
        show-delete
        show-set-default
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        />
  </div>
</template>

<script>
import {
  Toast,
  AddressEdit
} from 'vant'
import {list} from '../../../../static/region/region.js'
import axios from 'axios'
export default {
  components: {
    AddressEdit
  },
  data () {
    return {
      areaList: list(),
      searchResult: [],
      addressInfo: {
        id: '',
        name: '',
        tel: '',
        province: '',
        county: '',
        addressDetail: '',
        postalCode: '',
        areaCode: '',
        isDefault: ''
      }
    }
  },

  methods: {
    onSave (data) {
      console.log(data)
      let param = {}
      param.aid = this.$route.query.aid
      param.sname = data.name
      param.sphone = data.tel
      if (data.province === data.city) {
        param.saddress = data.province + '/' + data.county
      } else {
        param.saddress = data.province + '/' + data.city + '/' + data.county
      }
      param.detailadd = data.addressDetail
      param.postcode = data.postalCode
      param.uid = JSON.parse(localStorage.getItem('userId'))
      param.areaCode = data.areaCode
      if (data.isDefault) {
        param.default = 1
      } else {
        param.default = 0
      }
      axios.post('http://localhost:8088/address/saveAddress', param).then(this.saveSuccess).catch()
    },
    saveSuccess (res) {
      console.log(res)
    },
    onDelete () {
      Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    },
    getAddress () {
      axios.get('http://localhost:8088/address/getAddressList?aid=' + this.$route.query.aid).then(this.getAddressSuccess)
    },
    getAddressSuccess (res) {
      console.log(res)
      let data = res.data.r[0]
      this.addressInfo.id = data.aid
      this.addressInfo.name = data.sname
      this.addressInfo.tel = data.sphone
      if (data.saddress.split('/').length === 3) {
        this.addressInfo.province = data.saddress.split('/')[0]
        this.addressInfo.county = data.saddress.split('/')[2]
        this.addressInfo.city = data.saddress.split('/')[1]
      } else {
        this.addressInfo.province = data.saddress.split('/')[0]
        this.addressInfo.county = data.saddress.split('/')[1]
      }
      this.addressInfo.addressDetail = data.detailadd
      this.addressInfo.postalCode = data.postcode
      this.addressInfo.areaCode = data.areaCode + ''
      if (data.isdefault === 1) {
        this.addressInfo.isDefault = true
      } else {
        this.addressInfo.isDefault = false
      }
    }
  },
  mounted () {
    if (this.$route.query.aid) {
      this.getAddress()
    }
  }
}
</script>
<style lang="scss" scoped>
.root{}
</style>
