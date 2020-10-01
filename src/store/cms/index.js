import Vue from 'vue'
import Vuex from 'vuex'
import * as cmsService from '@/services/cms'

Vue.use(Vuex)

const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 100,
  pageSizeOptions: ['25', '35', '45', '100', '200'],
  showQuickJumper: true,
  showSizeChanger: true,
}
const DEFAULT_FILTERS = null
const DEFAULT_SORTER = { field: 'published_at', order: 'descend' }
const DEFAULT_QUERY = {
  pagination: DEFAULT_PAGINATION,
  filters: DEFAULT_FILTERS,
  sorter: DEFAULT_SORTER,
}
const DEFAULT_META = {
  total: 100,
}

export default {
  namespaced: true,
  state: {
    loading: false,
    posts: [],
    pick_posts: [],
    post: null,
    query: DEFAULT_QUERY,
    meta: DEFAULT_META,
  },
  getters: {
    loading: (state) => state.loading,
    posts: (state) => state.posts,
    pick_posts: (state) => state.pick_posts,
    query: (state) => state.query,
    pagination: (state) => state.query.pagination,
    filters: (state) => state.query.filters,
    sorter: (state) => state.query.sorter,
    meta: (state) => state.meta,
  },
  mutations: {
    INIT: (state) => {
      state.query = DEFAULT_QUERY
      state.meta = DEFAULT_META
    },
    SET_POSTS: (state, posts) => {
      state.posts = posts
    },
    SET_PICK_POSTS: (state, posts) => {
      state.pick_posts = posts
    },
    SET_PAGINATION: (state, pagination) => {
      state.query.pagination = pagination
    },
    SET_FILTERS: (state, filters) => {
      state.query.filters = filters
    },
    SET_SORTER: (state, sorter) => {
      const { field, order } = sorter
      state.query.sorter = { field, order }
    },
    SET_POSTS_META: (state, meta) => {
      state.meta = meta
      if (meta.total) state.query.pagination.total = meta.total
    },
    START_LOADING: (state) => {
      state.loading = true
    },
    END_LOADING: (state) => {
      state.loading = false
    },
  },
  actions: {
    // data handling
    async fetchPosts({ commit, state }) {
      commit('START_LOADING')
      const res = await cmsService.fetchPostsByQuery(state.query)
      if (res.posts) commit('SET_POSTS', res.posts)
      if (res.posts) commit('SET_PICK_POSTS', res.posts)
      if (res.meta) commit('SET_POSTS_META', res.meta)
      commit('END_LOADING')
      return res.posts
    },
    pick_posts({ commit }, posts) {
      if (posts) commit('SET_PICK_POSTS', posts)
    },
  },
}
