import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import users from './users'
import settings from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    users,
    settings,
  },
  state: {},
  mutations: {},
  actions: {},
})
