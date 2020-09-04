import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import users from './users'
import settings from './settings'
import members from './members'
import contributions from './contributions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    users,
    members,
    settings,
    contributions,
  },
  state: {},
  mutations: {},
  actions: {},
})
