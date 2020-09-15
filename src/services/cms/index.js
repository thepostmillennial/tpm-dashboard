import apiClient from '@/services/axios'
import config from '@/configs'

/***************************
 * CONTENT PICKS FUNCTIONS
 ***************************/

// count all posts
export async function countPosts() {
  return apiClient
    .get(config.api.cms.posts_count)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[CMS/Posts API]:', err))
}

// get all posts
export async function fetchPosts() {
  return apiClient
    .get(config.api.cms.posts)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[CMS/Posts API]:', err))
}

// get posts list by query
export async function fetchPostsByQuery(query) {
  return apiClient
    .post(`${config.api.cms.posts}/query`, query)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[CMS/Posts API]:', err))
}

// // get pick by id
// export async function fetchPickById(id) {
//   return apiClient
//     .get(`${config.api.content.picks}/${id}`)
//     .then(res => (res && res.data) ? res.data : false)
//     .catch(err => console.error('[Content/Picks API]:', err))
// }

// // update a pick
// export async function updatePick(member) {
//   return apiClient
//     .put(config.api.content.picks, member)
//     .then(res => (res && res.data) ? res.data : false)
//     .catch(err => console.error('[Content/Picks API]:', err))
// }

// // delete a pick
// export async function removePick(id) {
//   return apiClient
//     .delete(`${config.api.content.picks}/${id}`)
//     .then(res => (res && res.data) ? res.data : false)
//     .catch(err => console.error('[Content/Picks API]:', err))
// }
