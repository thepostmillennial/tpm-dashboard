import apiClient from '@/services/axios'
// import store from 'store'
import config from '@/configs'
// import Cookies from 'js-cookie'

// users functions
// get all users
export async function fetchUsers() {
  return apiClient
    .get(config.api.system.users)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[System/Users API]:', err))
}

// get user by username
export async function fetchUserByUsername(username) {
  return apiClient
    .get(`${config.api.system.user_by_username}/${username}`)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[System/Users API]:', err))
}

// get user by username
export async function updateUser(user) {
  return apiClient
    .put(config.api.system.users, user)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[System/Users API]:', err))
}
