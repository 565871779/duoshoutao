<template>
  <div class="root">
    <div class="line"></div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components: {
    Header
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  computed: {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  mounted () {}
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
/deep/ .sidebar {
  top: 62px;
}
</style>
