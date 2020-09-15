<template>
  <div id="app">
    <localization></localization>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Localization from '@/localization'

export default {
  name: 'app',
  components: { Localization },
  computed: {
    ...mapState(['settings']),
    ...mapState('user', ['authorized']),
    nextRoute() {
      return this.$route.query.redirect || '/'
    },
    currentRoute() {
      return this.$route.path
    },
  },
  created() {
    this.$store.dispatch('fetch_counts')
  },
  mounted() {
    this.$store.commit('SET_PRIMARY_COLOR', {
      color: this.settings.primaryColor,
    })
    this.$store.commit('SET_THEME', { theme: this.settings.theme })
  },
  watch: {
    '$store.state.settings.theme'(theme) {
      this.$store.commit('SET_THEME', { theme })
    },
    '$store.state.user.authorized'(authorized) {
      if (authorized && this.currentRoute === '/auth/login') {
        this.$router.replace(this.nextRoute)
      }
    },
    $route(to, from) {
      const query = Object.assign({}, to.query)
      this.$store.commit('SETUP_URL_SETTINGS', query)
    },
  },
}
</script>
