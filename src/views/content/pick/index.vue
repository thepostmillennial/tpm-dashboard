<template>
  <div class="view content pick-detail">
    <div class="page">
      <a-page-header :title="pick.name" :sub-title="pick._id" @back="() => $router.push('/content/picks')">
        <template slot="tags">
          <a-tag color="blue"> {{ pick.updated_at | moment('lll') }} </a-tag>
        </template>
        <template slot="extra">
          <a-button key="1" type="primary"> Update </a-button>
        </template>
        {{ pick.description }}
      </a-page-header>
      <div class="content">
        <div class="card p-3">{{ pick }}</div>
        <div class="card p-3">{{ posts }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  async beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      await store.dispatch('content/init', to.params.id)
      next()
    }
  },
  data() {
    return {
      pick: null,
    }
  },
  computed: {
    posts() {
      return store.getters['cms/posts']
    },
  },
  async created() {
    this.pick = store.getters['content/pick']
  },
}
</script>

<style lang="scss" scoped></style>
