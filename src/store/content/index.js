import Vue from 'vue'
import Vuex from 'vuex'
import * as contentService from '@/services/content'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    loading: false,
    picks: [],
    pick: null,

  },
  getters: {
    loading: state => state.loading,
    picks: state => state.picks,
    pick: state => state.pick,
  },
  mutations: {
    SET_PICKS: (state, picks) => { state.picks = picks },
    SET_PICK: (state, pick) => { state.pick = pick },
    DELETE_PICK: (state, pick) => { state.pick = null },
    START_LOADING: (state) => { state.loading = true },
    END_LOADING: (state) => { state.loading = false },
  },
  actions: {

    // data initialaztion
    async init({ commit, dispatch }, id) {
      commit('START_LOADING')
      await dispatch('fetchPickById', id)
      dispatch('cms/fetchPosts', null, { root: true })
      commit('END_LOADING')
    },

    // data handling
    async fetchPicks({ commit }) {
      commit('START_LOADING')
      const picks = await contentService.fetchPicks()
      if (picks) commit('SET_PICKS', picks)
      commit('END_LOADING')
      return picks
    },

    async fetchPickById({ commit }, id) {
      commit('START_LOADING')
      if (id) {
        const pick = await contentService.fetchPickById(id)
        if (pick) commit('SET_PICK', pick)
        return pick
      }
      commit('END_LOADING')
    },

    async updatePick({ commit }, pick) {
      commit('START_LOADING')
      if (pick) {
        const pick_updated = await contentService.updatePick(pick)
        if (pick_updated) commit('SET_PICK', pick_updated)
        return pick_updated
      }
      commit('END_LOADING')
    },

    async deletePick({ commit }, id) {
      commit('START_LOADING')
      if (id) {
        const pick_deleted = await contentService.removePick(id)
        if (pick_deleted) commit('DELETE_PICK', pick_deleted)
        return pick_deleted
      }
      commit('END_LOADING')
    },

  },
}
