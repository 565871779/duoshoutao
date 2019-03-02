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

Vue.use(Router)

export default new Router({
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
    }
  ]
})
