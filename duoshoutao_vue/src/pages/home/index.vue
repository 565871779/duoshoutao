<template>
  <div class="root">
    <div class="top">
      <div class="header">
        <span>剁手淘</span>
        <span>duoshoutao</span>
      </div>
      <van-cell-group>
        <van-field v-model="value" placeholder="搜索剁手淘商品"/>
        <img src alt>
      </van-cell-group>
    </div>
    <bottom></bottom>
  </div>
</template>
<script>
import bottom from './index_bottom'
export default {
  components: {
      bottom
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.root {
}
</style>
