import Vue from 'vue'
import Router from 'vue-router'
import register from '@/pages/home/register'
import login from '@/pages/home/login'
import index from '@/pages/home/index'
import category from '@/pages/home/category'
import home from '@/pages/home/home'
import find from '@/pages/home/find'
import mine from '@/pages/home/mine'
import shopcar from '@/pages/home/shopcar'
import detail from '@/pages/home/store/detail'
import myorder from '@/pages/home/order/myorder'
import addressList from '@/pages/home/address/addressList'
import addressAdd from '@/pages/home/address/addressAdd'
import userUpdate from '@/pages/home/user/userUpdate'
import updatePs from '@/pages/home/user/updatePs'
import updateTel from '@/pages/home/user/updateTel'
import search from '@/pages/home/search/search'
import createOrder from '@/pages/home/order/buyToCreateOrder'
import orderDetail from '@/pages/home/order/orderDetail'
import history from '@/pages/home/history/history'
import store from '@/pages/home/store/home'
import collectList from '@/pages/home/collectList/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/userUpdate',
      name: 'userUpdate',
      component: userUpdate
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          name: index,
          component: index
        },
        {
          path: 'category',
          name: category,
          component: category
        },
        {
          path: 'find',
          name: find,
          component: find
        },
        {
          path: 'mine',
          name: mine,
          component: mine
        },
        {
          path: 'shopcar',
          name: shopcar,
          component: shopcar
        }
      ]
    }, {
      path: '/store/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/order/myorder',
      name: 'myorder',
      component: myorder
    },
    {
      path: '/address/addresslist',
      name: 'addressList',
      component: addressList
    },
    {
      path: '/address/addressadd',
      name: 'addressAdd',
      component: addressAdd
    },
    {
      path: '/address/updatePs',
      name: 'updatePs',
      component: updatePs
    },
    {
      path: '/address/updateTel',
      name: 'updateTel',
      component: updateTel
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/order/createOrder',
      name: 'createOrder',
      component: createOrder
    },
    {
      path: '/order/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/store',
      name: 'store',
      component: store
    },
    {
      path: '/collectList',
      name: 'collectList',
      component: collectList
    }
  ]
})
