import Vue from 'vue'
import Vuex from 'vuex'
// import router from '@/router'

import * as membersService from '@/services/members'
import { reduceQuery } from '@/utils'

Vue.use(Vuex)

const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 25,
  pageSizeOptions: ['10', '25', '35', '45', '100'],
  showQuickJumper: true,
  showSizeChanger: true,
}
const DEFAULT_FILTERS = null
const DEFAULT_SORTER = { field: 'created_at', order: 'descend' }
const DEFAULT_QUERY = {
  pagination: DEFAULT_PAGINATION,
  filters: DEFAULT_FILTERS,
  sorter: DEFAULT_SORTER,
}
const DEFAULT_META = {
  total: 25,
}

export default {
  namespaced: true,
  state: {
    loading: false,
    members: [],
    member: null,
    query: DEFAULT_QUERY,
    meta: DEFAULT_META,

  },
  getters: {
    loading: state => state.loading,
    members: state => state.members,
    member: state => state.member,
    query: state => state.query,
    pagination: state => state.query.pagination,
    filters: state => state.query.filters,
    sorter: state => state.query.sorter,
    meta: state => state.meta,
  },
  mutations: {
    INIT: (state) => {
      state.query = DEFAULT_QUERY
      state.meta = DEFAULT_META
    },
    SET_MEMBERS: (state, members) => { state.members = members },
    SET_MEMBER: (state, member) => { state.member = member },
    SET_PAGINATION: (state, pagination) => { state.query.pagination = pagination },
    SET_FILTERS: (state, filters) => { state.query.filters = filters },
    SET_SORTER: (state, sorter) => {
      const { field, order } = sorter
      state.query.sorter = { field, order }
    },
    SET_MEMBERS_META: (state, meta) => {
      state.meta = meta
      if (meta.total) state.query.pagination.total = meta.total
    },
    START_LOADING: (state) => { state.loading = true },
    END_LOADING: (state) => { state.loading = false },
  },
  actions: {

    // initialization
    init({ commit }) {
      commit('INIT')
    },

    // set pagination
    setPagination({ commit }, pagination) {
      if (pagination && pagination.current) commit('SET_PAGINATION', pagination)
    },

    // set filters
    setFilters({ commit }, filters) {
      if (filters && Object.keys(filters).length) commit('SET_FILTERS', filters)
    },

    // set sorter
    setSorter({ commit }, sorter) {
      if (sorter && sorter.field) commit('SET_SORTER', sorter)
    },

    // set all query same time
    setQuery({ dispatch }, { pagination, filters, sorter }) {
      dispatch('setPagination', pagination)
      dispatch('setFilters', filters)
      dispatch('setSorter', sorter)
      dispatch('fetchMembers')
    },

    // data handling
    async fetchMembers({ commit, state }) {
      commit('START_LOADING')
      const { members, meta } = await membersService.fetchMembersByQuery(reduceQuery(state.query))
      if (members) commit('SET_MEMBERS', members)
      if (meta) commit('SET_MEMBERS_META', meta)
      commit('END_LOADING')
      return members
    },

    async fetchMemberById({ commit }, id) {
      commit('START_LOADING')
      if (id) {
        const member = await membersService.fetchMemberById(id)
        if (member) commit('SET_MEMBER', member)
        return member
      }
      commit('END_LOADING')
    },

    async updateMember({ commit }, member) {
      commit('START_LOADING')
      if (member) {
        const member_updated = await membersService.updateMember(member)
        if (member_updated) commit('SET_MEMBER', member_updated)
        return member_updated
      }
      commit('END_LOADING')
    },
  },
}
