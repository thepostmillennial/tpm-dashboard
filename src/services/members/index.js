import apiClient from '@/services/axios'
// import store from 'store'
import config from '@/configs'

// users functions
// get all users
export async function fetchMembers() {
  return apiClient
    .get(config.api.members.members)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get users by query
export async function fetchMembersByQuery(query) {
  return apiClient
    .post(`${config.api.members.members}/query`, query)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get member by id
export async function fetchMemberById(id) {
  return apiClient
    .get(`${config.api.members.members}/${id}`)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// update member
export async function updateMember(member) {
  return apiClient
    .put(config.api.members.members, member)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}
