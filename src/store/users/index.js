import Vue from 'vue'
import Vuex from 'vuex'
// import router from '@/router'

import * as usersService from '@/services/system/users'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    users: [],
    user: null,
    loading: false,
  },
  getters: {
    users: state => state.users,
    user: state => state.user,
    loading: state => state.loading,
  },
  mutations: {

    SET_USERS: (state, users) => {
      state.users = users
    },

    SET_USER: (state, user) => {
      state.user = user
    },

    START_LOADING: (state) => {
      state.loading = true
    },

    END_LOADING: (state) => {
      state.loading = false
    },

  },
  actions: {

    async fetchUsers({ commit }) {
      commit('START_LOADING')
      const users = await usersService.fetchUsers()
      if (users) commit('SET_USERS', users)
      commit('END_LOADING')
      return users
    },

    async fetchUserByUsername({ commit }, username) {
      commit('START_LOADING')
      if (username) {
        const user = await usersService.fetchUserByUsername(username)
        if (user) commit('SET_USER', user)
        return user
      }
      commit('END_LOADING')
    },

    async updateUser({ commit }, user) {
      commit('START_LOADING')
      if (user) {
        const user_updated = await usersService.updateUser(user)
        if (user_updated) commit('SET_USER', user_updated)
        return user_updated
      }
      commit('END_LOADING')
    },
  },
}
