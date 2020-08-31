<template>
  <div class="view member">
    {{ member }}
  </div>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
      member: null,
    }
  },
  methods: {},
  async created() {
    this.member = await store.dispatch('members/fetchMemberById', this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped></style>
