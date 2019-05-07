import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  num: 0,
  show: false
}

const store = new Vuex.Store({
  state
})

export default store
