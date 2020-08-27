import apiClient from '@/services/axios'
// import store from 'store'
import config from '@/configs'
// import Cookies from 'js-cookie'

// users functions
// get all users
export async function fetchUsers() {
  return apiClient
    .get(config.api.system.users)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get user by username
export async function fetchUserByUsername(username) {
  return apiClient
    .get(`${config.api.system.user_by_username}/${username}`)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get user by username
export async function updateUser(user) {
  return apiClient
    .put(config.api.system.users, user)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}
