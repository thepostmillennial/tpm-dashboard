import apiClient from '@/services/axios'
import config from '@/configs'

/***************************
 * CONTENT PICKS FUNCTIONS
 ***************************/

// count all picks
export async function countPicks() {
  return apiClient
    .get(config.api.content.picks_count)
    .then((res) => (res && res.data ? res.data : false))
    .catch((err) => console.error('[Content/Picks API]:', err))
}

// get all picks
export async function fetchPicks() {
  return apiClient
    .get(config.api.content.picks)
    .then((res) => (res && res.data ? res.data : false))
    .catch((err) => console.error('[Content/Picks API]:', err))
}

// get picks by query
export async function fetchPicksByQuery(query) {
  return apiClient
    .post(`${config.api.content.picks}/query`, query)
    .then((res) => (res && res.data ? res.data : false))
    .catch((err) => console.error('[Content/Picks API]:', err))
}

// get pick by id
export async function fetchPickById(id) {
  return apiClient
    .get(`${config.api.content.picks}/${id}`)
    .then((res) => (res && res.data ? res.data : false))
    .catch((err) => console.error('[Content/Picks API]:', err))
}

// get posts by pick id
export async function fetchPostsByPickId(id) {
  return apiClient
    .get(`${config.api.content.pick}/post/${id}`)
    .then((res) => (res && res.data ? res.data : false))
    .catch((err) => console.error('[Content/Picks API]:', err))
}

// update a pick
export async function updatePick(pick) {
  return apiClient
    .put(config.api.content.picks, pick)
    .then((res) => (res && res.data ? res.data : false))
    .catch((err) => console.error('[Content/Picks API]:', err))
}

// delete a pick
export async function removePick(id) {
  return apiClient
    .delete(`${config.api.content.picks}/${id}`)
    .then((res) => (res && res.data ? res.data : false))
    .catch((err) => console.error('[Content/Picks API]:', err))
}
