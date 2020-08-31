import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import users from './users'
import settings from './settings'
import members from './members'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    users,
    members,
    settings,
  },
  state: {},
  mutations: {},
  actions: {},
})
