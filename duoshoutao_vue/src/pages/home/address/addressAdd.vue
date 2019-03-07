<template>
  <div class="root">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
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
export default {
  components: {
    AddressEdit
  },
  data () {
    return {
      areaList: list(),
      searchResult: []
    }
  },

  methods: {
    onSave () {
      Toast('save')
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
    }
  }
}
</script>
<style lang="scss" scoped>
.root{}
</style>
