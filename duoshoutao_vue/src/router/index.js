import Vue from 'vue'
import Router from 'vue-router'
import register from '@/pages/home/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: register
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // }
  ]
})
