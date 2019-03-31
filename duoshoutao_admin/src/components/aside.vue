<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="setMenuActive()"
      background-color="#1c2b36"
      text-color="#8dacc4"
      active-text-color="#fff"
      unique-opened
    >
      <template v-for="item in menus">
        <template v-if="item.children">
          <el-submenu :index="`${item.id}`" :key="item.id">
            <template slot="title">
              <i :class="`fa ${icons[item.id-1]}`"></i>
              {{ item.name }}
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="`${subItem.value}`"
            >{{ subItem.name }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="`${item.value}`" :key="item.id">
            <i :class="`fa ${icons[item.id-1]}`"></i>
            {{ item.name }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Maside',
  data () {
    return {
      icons: ['fa-newspaper-o', 'fa-line-chart', 'fa-user-circle'],
      menus: [{
        id: 1,
        value: 'store',
        name: '店铺管理'
      },
      {
        id: 2,
        value: 'goods',
        name: '商品管理'
      },
      {
        id: 3,
        value: 'order',
        name: '订单管理'
      }]
    }
  },
  computed: {
  },
  methods: {
    setMenuActive () {
      console.log(location.href)
      if (location.href.includes('goods')) {
        return 'goods'
      } else if (location.href.includes('order')) {
        return 'order'
      } else {
        return 'store'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 240px;
  left: 0;
  top: 55px;
  bottom: 0;
  border-right: 1px solid #17232c;
  transition: left 0.5s ease;
  -webkit-transition: left 0.5s ease;
  -moz-transition: left 0.5s ease;
  -ms-transition: left 0.5s ease;
  -o-transition: left 0.5s ease;
  font-size: 13px;
  overflow: hidden;
  .fa {
    margin-right: 10px;
    color: #8dacc4;
    position: relative;
    z-index: 11;
    font-size: 16px;
    width: 21px;
  }
  .el-submenu .el-menu-item {
    padding-left: 50px !important;
  }
  .is-active {
    background-color: #17232c !important;
    .fa {
      color: #fff;
    }
  }
}
.sidebar > ul {
  height: 100%;
  width: 100%;
}
</style>
