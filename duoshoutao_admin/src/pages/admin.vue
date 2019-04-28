<template>
    <div>
        <div class="line"></div>
        <Header></Header>
        <Aside :test="'456'"></Aside>
        <router-view></router-view>
    </div>
</template>

<script>

import Aside from '@/components/aside'
import Header from '@/components/header'
export default {
  data () {
    return {
    }
  },
  components: {
    Aside,
    Header
  },
  methods: {
    name () {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-col-12 {
  width: 10vw;
}
.el-tabs--top {
  margin-left: 11%;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
.tac {
  position: absolute;
  top: 55px;
}
.add {
    margin-bottom: 10px;
}
</style>
