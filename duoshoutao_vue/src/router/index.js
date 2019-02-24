import Vue from 'vue'
import Router from 'vue-router'
import register from '@/pages/home/register'
import login from '@/pages/home/login'
import index from '@/pages/home/index'
import category from '@/pages/home/category'

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
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/category',
      name: 'category',
      component: category
    }
  ]
})
