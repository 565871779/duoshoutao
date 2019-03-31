import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import regist from '@/pages/regist'
import store from '@/pages/store'
import storeEdit from '@/pages/storeEdit'
import goodsList from '@/pages/goods'

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
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          component: store,
          name: 'store'
        },
        {
          path: '/goodsList',
          component: goodsList,
          name: 'goodsList'
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
    }
  ]
})
