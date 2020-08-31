import apiClient from '@/services/axios'
import store from 'store'
import config from '@/configs'
import jwt from 'jsonwebtoken'

// Utils functions
export function persistToken(accessToken) {
  store.set(config.access_token_name, accessToken)
  return true
}

export function retrieveToken() {
  return store.get(config.access_token_name) || null
}

export function removeToken() {
  store.remove(config.access_token_name)
  return true
}

export function retrieveAuth(token) {
  const _token = token || retrieveToken()
  return _token ? jwt.decode(_token) : false
}

// Login with basic auth
export async function login(identity, password) {
  return apiClient
    .post(config.api.auth.login, { identity, password })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) persistToken(accessToken)
        return response.data
      }
      return false
    })
    .catch(err => {
      removeToken()
      console.log(err)
    })
}

export async function register(name, username, email, password) {
  return apiClient
    .post(config.api.auth.register, { name, username, email, password })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) persistToken(accessToken)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      return removeToken()
    })
    .catch(err => console.log(err))
}
