import Vue from 'vue'
import Vuex from 'vuex'
import * as contributionsService from '@/services/contributions'

Vue.use(Vuex)

const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 25,
  pageSizeOptions: ['10', '25', '35', '45'],
  showQuickJumper: true,
  showSizeChanger: true,
}

const DEFAULT_SORTER = { field: 'created_at', order: 'descend' }

export default {
  namespaced: true,

  state: {
    loading: false,
    contributions: [],
    contribution: null,
    reminders: [],
    reminder: null,
    query: {
      pagination: DEFAULT_PAGINATION,
      filters: null,
      sorter: DEFAULT_SORTER,
    },
    meta: {
      total: 25,
    },

  },
  getters: {
    loading: state => state.loading,

    contributions: state => state.contributions,
    contribution: state => state.contribution,

    reminders: state => state.reminders,
    reminder: state => state.reminder,

    query: state => state.query,
    pagination: state => state.query.pagination,
    filters: state => state.query.filters,
    sorter: state => state.query.sorter,
    meta: state => state.meta,
  },
  mutations: {
    INIT: (state) => {
      state.query.pagination = DEFAULT_PAGINATION
      state.query.filters = null
      state.query.sorter = DEFAULT_SORTER
      state.meta = { total: 25 }
    },

    SET_CONTRIBUTIONS: (state, contributions) => { state.contributions = contributions },
    SET_CONTRIBUTION: (state, contribution) => { state.contribution = contribution },

    SET_REMINDERS: (state, reminders) => { state.reminders = reminders },
    SET_REMINDER: (state, reminder) => { state.reminder = reminder },

    SET_PAGINATION: (state, pagination) => { state.query.pagination = pagination },
    SET_FILTERS: (state, filters) => { state.query.filters = filters },
    SET_SORTER: (state, sorter) => {
      const { field, order } = sorter
      state.query.sorter = { field, order }
    },
    SET_META: (state, meta) => {
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

    /******************************
     * CONTRIBUTIONS DATA HANDLING
     ******************************/

    // set all query same time for contributions
    setContributionsQuery({ dispatch }, { pagination, filters, sorter }) {
      dispatch('setPagination', pagination)
      dispatch('setFilters', filters)
      dispatch('setSorter', sorter)
      dispatch('fetchContributions')
    },

    async fetchContributions({ commit, state }) {
      commit('START_LOADING')
      const { contributions, meta } = await contributionsService.fetchContributionsByQuery(state.query)
      if (contributions) commit('SET_CONTRIBUTIONS', contributions)
      if (meta) commit('SET_META', meta)
      commit('END_LOADING')
      return contributions
    },

    async fetchContributionById({ commit }, id) {
      commit('START_LOADING')
      if (id) {
        const contribution = await contributionsService.fetchContributionById(id)
        if (contribution) commit('SET_CONTRIBUTION', contribution)
        return contribution
      }
      commit('END_LOADING')
    },

    async updateContribution({ commit }, contribution) {
      commit('START_LOADING')
      if (contribution) {
        const contribution_updated = await contributionsService.updateContribution(contribution)
        if (contribution_updated) commit('SET_CONTRIBUTION', contribution_updated)
        return contribution_updated
      }
      commit('END_LOADING')
    },

    /******************************
     * REMINDERS DATA HANDLING
     ******************************/

    // set all query same time for reminders
    setRemindersQuery({ dispatch }, { pagination, filters, sorter }) {
      dispatch('setPagination', pagination)
      dispatch('setFilters', filters)
      dispatch('setSorter', sorter)
      dispatch('fetchReminders')
    },

    async fetchReminders({ commit, state }) {
      commit('START_LOADING')
      const { reminders, meta } = await contributionsService.fetchRemindersByQuery(state.query)
      if (reminders) commit('SET_REMINDERS', reminders)
      if (meta) commit('SET_META', meta)
      commit('END_LOADING')
      return reminders
    },

    async fetchReminderById({ commit }, id) {
      commit('START_LOADING')
      if (id) {
        const reminder = await contributionsService.fetchReminderById(id)
        if (reminder) commit('SET_REMINDER', reminder)
        return reminder
      }
      commit('END_LOADING')
    },

    async updateReminder({ commit }, reminder) {
      commit('START_LOADING')
      if (reminder) {
        const reminder_updated = await contributionsService.updateReminder(reminder)
        if (reminder_updated) commit('SET_REMINDER', reminder_updated)
        return reminder_updated
      }
      commit('END_LOADING')
    },
  },
}
