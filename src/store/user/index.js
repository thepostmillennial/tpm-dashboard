import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import * as firebase from '@/services/firebase'
import * as jwt from '@/services/jwt'

const mapAuthProviders = {
  firebase: {
    login: firebase.login,
    register: firebase.register,
    currentAccount: firebase.currentAccount,
    logout: firebase.logout,
  },
  jwt: {
    login: jwt.login,
    register: jwt.register,
    currentAccount: jwt.currentAccount,
    logout: jwt.logout,
  },
}

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    display_name: '',
    email: '',
    phone: '',
    avatar: '',
    roles: [],
    authorized: false, // false is default value
    loading: false,
  },

  getters: {
    user: state => state,
  },

  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
  },
  actions: {

    LOGIN({ commit, dispatch, rootState }, { payload }) {
      const { identity, password } = payload
      commit('SET_STATE', { loading: true })

      const login = mapAuthProviders[rootState.settings.authProvider].login
      login(identity, password).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          Vue.prototype.$notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in to The Administration Dashboard for The Post Millennial!',
          })
        } else { commit('SET_STATE', { loading: false }) }
      })
    },

    REGISTER({ commit, dispatch, rootState }, { payload }) {
      const { email, password, name } = payload
      commit('SET_STATE', { loading: true })

      const register = mapAuthProviders[rootState.settings.authProvider].register
      register(email, password, name).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          Vue.prototype.$notification.success({
            message: 'Succesful Registered',
            description: 'You have successfully registered!',
          })
        } else {
          commit('SET_STATE', { loading: false })
        }
      })
    },

    RETRIEVE_AUTHENTICATION({ commit }) {
      const account = jwt.retrieveAccount()
      if (account) {
        commit('SET_STATE', {
          id: account._id,
          name: account.name,
          display_name: account.display_name,
          email: account.email,
          phone: account.phone,
          avatar: account.avatar,
          roles: account.roles,
          authorized: true,
          loading: false,
        })
        router.push('/')
      } else {
        router.push('/auth/login')
      }
    },

    LOAD_CURRENT_ACCOUNT({ commit, rootState }) {
      commit('SET_STATE', { loading: true })
      const currentAccount = mapAuthProviders[rootState.settings.authProvider].currentAccount
      currentAccount().then(account => {
        if (account) {
          commit('SET_STATE', {
            id: account._id,
            name: account.name,
            display_name: account.display_name,
            email: account.email,
            phone: account.phone,
            avatar: account.avatar,
            roles: account.roles,
            authorized: true,
            loading: false,
          })
          router.push('/')
        }
        commit('SET_STATE', { loading: false })
      })
    },

    LOGOUT({ commit, rootState }) {
      const logout = mapAuthProviders[rootState.settings.authProvider].logout
      logout().then(() => {
        commit('SET_STATE', {
          id: '',
          name: '',
          display_name: '',
          email: '',
          phone: '',
          avatar: '',
          roles: [],
          authorized: false,
          loading: false,
        })
        router.push('/auth/login')
      })
    },
  },

}
