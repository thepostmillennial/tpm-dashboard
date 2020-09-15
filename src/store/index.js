import Vue from 'vue'
import Vuex from 'vuex'
// modules
import cms from './cms'
import user from './user'
import users from './users'
import settings from './settings'
import content from './content'
import members from './members'
import contributions from './contributions'
// services
// import * as cmsService from '@/services/cms'
import * as contentService from '@/services/content'
import * as membersService from '@/services/members'
import * as contributionsService from '@/services/contributions'
// data
import { getMenuData } from '@/services/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cms,
    user,
    users,
    content,
    members,
    settings,
    contributions,
  },
  state: {
    menu: getMenuData,
    counts: {
      postpicks: 0,
      members: 0,
      reminders: 0,
    },
  },
  getters: {
    menu: state => state.menu,
    count: state => key => { return state.counts[key] || 0 },
  },
  mutations: {
    UPDATE_COUNT(state, { key, count }) {
      if (count && typeof count === 'number') {
        state.counts[key] = count
        state.menu.find(item => item.key === key).count = count
      }
    },
  },
  actions: {
    async fetch_counts({ commit }) {
      // postpicks count
      commit('UPDATE_COUNT', { key: 'postpicks', count: await contentService.countPicks() })
      // members count
      commit('UPDATE_COUNT', { key: 'members', count: await membersService.countMembers() })
      // reminders count
      commit('UPDATE_COUNT', { key: 'reminders', count: await contributionsService.countReminders() })
    },
  },
})
