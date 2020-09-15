import apiClient from '@/services/axios'
import config from '@/configs'

/**********************
 * MEMBERS FUNCTIONS
 **********************/

// count all members
export async function countMembers() {
  return apiClient
    .get(config.api.members.count)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Members API]:', err))
}

// get all members
export async function fetchMembers() {
  return apiClient
    .get(config.api.members.members)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Members API]:', err))
}

// get members by query
export async function fetchMembersByQuery(query) {
  return apiClient
    .post(`${config.api.members.members}/query`, query)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Members API]:', err))
}

// get member by id
export async function fetchMemberById(id) {
  return apiClient
    .get(`${config.api.members.members}/${id}`)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Members API]:', err))
}

// update member
export async function updateMember(member) {
  return apiClient
    .put(config.api.members.members, member)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Members API]:', err))
}
