import apiClient from '@/services/axios'
import config from '@/configs'

/**************************************
 * CONTRIBUTIONS FUNCTIONS
 **************************************/

// get all contributions
export async function fetchContributions() {
  return apiClient
    .get(config.api.contributions.base)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get contributions by query
export async function fetchContributionsByQuery(query) {
  return apiClient
    .post(`${config.api.contributions.base}/query`, query)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get contribution by id
export async function fetchContributionById(id) {
  return apiClient
    .get(`${config.api.contributions.base}/${id}`)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// update contribution
export async function updateContribution(contribution) {
  return apiClient
    .put(config.api.contributions.base, contribution)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

/**************************************
 * CONTRIBUTIONS REMINDERS FUNCTIONS
 **************************************/

// get all contribution reminders
export async function fetchContributionReminders() {
  return apiClient
    .get(config.api.contributions.reminders)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get reminders by query
export async function fetchRemindersByQuery(query) {
  return apiClient
    .post(`${config.api.contributions.reminders}/query`, query)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// get reminder by id
export async function fetchReminderById(id) {
  return apiClient
    .get(`${config.api.contributions.reminders}/${id}`)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// update reminder
export async function updateReminder(reminder) {
  return apiClient
    .put(config.api.contributions.reminders, reminder)
    .then(res => {
      if (res && res.data) {
        return res.data
      }
      return false
    })
    .catch(err => console.log(err))
}
