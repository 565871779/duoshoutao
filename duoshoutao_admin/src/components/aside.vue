<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="setMenuActive()"
      background-color="#1c2b36"
      text-color="#8dacc4"
      active-text-color="#fff"
      unique-opened
      v-if="!admin"
    >
      <template v-for="item in menus">
        <template v-if="item.children && item.value === 'goods'">
          <el-submenu :index="`${item.value}`" :key="item.id">
            <template slot="title">
              <i :class="`fa ${icons[item.id-1]}`"></i>
              {{ item.name }}
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.sid"
              :index="`${subItem.sid}`"
              @click="linkTo(subItem.sid)"
              >
            {{ subItem.sname }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else-if="item.children && item.value === 'order'">
          <el-submenu :index="`${item.value}`" :key="item.id">
            <template slot="title">
              <i :class="`fa ${icons[item.id-1]}`"></i>
              {{ item.name }}
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.sid"
              :index="`o${subItem.sid}`"
              @click="toOrder(subItem.sid)"
              >
            {{ subItem.sname }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="`${item.value}`" :key="item.id" @click="link(item.value)">
            <i :class="`fa ${icons[item.id-1]}`"></i>
            {{ item.name }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="setMenuActive()"
      background-color="#1c2b36"
      text-color="#8dacc4"
      active-text-color="#fff"
      unique-opened
      v-else
    >
      <template v-for="item in adminMeus">
        <template >
          <el-menu-item :index="`${item.value}`" :key="item.id" @click="toAdmin(item.value)">
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
        name: '商品管理',
        children: [
        ]
      },
      {
        id: 3,
        value: 'order',
        name: '订单管理',
        children: [
        ]
      }],
      adminMeus: [{
        id: 1,
        value: 'suser',
        name: '商家管理'
      },
      {
        id: 2,
        value: 'store',
        name: '店铺管理'
      }],
      uid: JSON.parse(localStorage.getItem('userId')),
      sid: this.$route.query.sid,
      defaultOpen: ['1'],
      admin: JSON.parse(localStorage.getItem('admin'))
    }
  },
  computed: {
  },
  props: {
    test: {type: String}

  },
  methods: {
    setMenuActive () {
      if (location.href.includes('goods')) {
        return this.$route.query.sid
      } else if (location.href.includes('order')) {
        return 'o' + this.$route.query.sid
      } else {
        return 'store'
      }
    },
    getStoreList () {
      this.$axios.get('http://localhost:8088/admin/store/getStoreList?uid=' + this.uid)
        .then((res) => {
          let data = res.data.r
          console.log(data)
          this.menus[1].children = data
          this.menus[2].children = data
          console.log(this.menus[1])
        })
    },
    linkTo (id) {
      this.$router.push('/home/goodsList?sid=' + id)
      this.$emit('clickTab', id)
    },
    toOrder (id) {
      this.$router.push('/home/order?sid=' + id)
      this.$emit('clickTab', id)
    },
    link (name) {
      this.$router.push('/home/' + name)
    },
    getStoreAdmin () {

    },
    toAdmin (name) {
      if (name === 'suser') {
        this.$router.push('/admin')
      }
      this.$router.push('/admin/' + name)
    }
  },
  mounted () {
    console.log(this.test)
    if (this.admin) {
      this.getStoreAdmin()
    } else {
      this.getStoreList()
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
  top: 62px;
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
