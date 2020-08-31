import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import * as auth from '@/services/auth'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    user: null,
    authorized: false,
    loading: false,
  },

  getters: {
    user: state => state.user,
    authorized: state => state.authorized,
    loading: state => state.loading,
  },

  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, { ...payload })
    },
    SET_AUTH(state, user) {
      state.user = user || null
      state.authorized = Boolean(user)
    },
  },

  actions: {
    AUTH({ commit }, accessToken) {
      const user = auth.retrieveAuth(accessToken)
      if (user && user._id) {
        commit('SET_AUTH', user)
        return true
      }
      return false
    },
    LOGIN({ commit, dispatch }, { payload }) {
      const { identity, password } = payload
      commit('SET_STATE', { loading: true })
      auth.login(identity, password).then(res => {
        if (res) {
          if (res.accessToken) dispatch('AUTH', res.accessToken)
          Vue.prototype.$notification.success({ message: 'Logged In', description: 'You have successfully logged in Reno SMS' })
        }
        commit('SET_STATE', { loading: false })
      })
    },
    REGISTER({ commit }, { payload }) {
      const { name, username, email, password } = payload
      commit('SET_STATE', { loading: true })
      auth.register(name, username, email, password).then(success => {
        if (success) {
          Vue.prototype.$notification.success({ message: 'Succesful Registered', description: 'You have successfully registered!' })
          router.push('/auth/login')
        }
        commit('SET_STATE', { loading: false })
      })
    },

    LOGOUT({ commit }) {
      commit('SET_STATE', { loading: true })
      auth.logout().then(() => {
        commit('SET_STATE', {
          user: null,
          authorized: false,
          loading: false,
        })
        router.push('/auth/login')
      })
    },
  },

}
