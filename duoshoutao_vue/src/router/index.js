import Vue from 'vue'
import Router from 'vue-router'
import Duoshoutao from './duoshoutao'

Vue.use(Router)

const router = new Router({
	mode: 'history'
  routes: [
    ...Duoshoutao
  ]
})

export default router