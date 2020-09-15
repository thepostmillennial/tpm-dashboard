import apiClient from '@/services/axios'
import config from '@/configs'

/**************************************
 * CONTRIBUTIONS FUNCTIONS
 **************************************/

// get all contributions
export async function fetchContributions() {
  return apiClient
    .get(config.api.contributions.base)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution API]:', err))
}

// get contributions by query
export async function fetchContributionsByQuery(query) {
  return apiClient
    .post(`${config.api.contributions.base}/query`, query)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution API]:', err))
}

// get contribution by id
export async function fetchContributionById(id) {
  return apiClient
    .get(`${config.api.contributions.base}/${id}`)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution API]:', err))
}

// update contribution
export async function updateContribution(contribution) {
  return apiClient
    .put(config.api.contributions.base, contribution)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution API]:', err))
}

/**************************************
 * CONTRIBUTIONS => REMINDERS FUNCTIONS
 **************************************/

// count all contribution reminders
export async function countReminders() {
  return apiClient
    .get(config.api.contributions.reminders_count)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution/Reminders API]:', err))
}

// get all contribution reminders
export async function fetchContributionReminders() {
  return apiClient
    .get(config.api.contributions.reminders)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution/Reminders API]:', err))
}

// get reminders by query
export async function fetchRemindersByQuery(query) {
  return apiClient
    .post(`${config.api.contributions.reminders}/query`, query)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution/Reminders API]:', err))
}

// get reminder by id
export async function fetchReminderById(id) {
  return apiClient
    .get(`${config.api.contributions.reminders}/${id}`)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution/Reminders API]:', err))
}

// update reminder
export async function updateReminder(reminder) {
  return apiClient
    .put(config.api.contributions.reminders, reminder)
    .then(res => (res && res.data) ? res.data : false)
    .catch(err => console.error('[Contribution/Reminders API]:', err))
}
