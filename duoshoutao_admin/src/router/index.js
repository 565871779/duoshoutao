import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import regist from '@/pages/regist'
import store from '@/pages/store'
import storeEdit from '@/pages/storeEdit'
import goodsEdit from '@/pages/goodsEdit'
import goodsList from '@/pages/goods'
import userCenter from '@/pages/userCenter'
import updatePassword from '@/pages/updatePassword'
import order from '@/pages/order'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'store',
          component: store,
          name: 'store'
        },
        {
          path: 'goodsList',
          component: goodsList,
          name: 'goodsList'
        },
        {
          path: 'order',
          component: order,
          name: 'order'
        }
      ]
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/storeEdit',
      name: 'storeEdit',
      component: storeEdit
    },
    {
      path: '/goodsEdit',
      name: 'goodsEdit',
      component: goodsEdit
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/updatePaw',
      name: 'updatePassword',
      component: updatePassword
    }
  ]
})
