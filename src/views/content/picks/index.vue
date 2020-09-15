<template>
  <div class="view content postspicks">
    <div class="page">
      <a-page-header title="Editors' Picks" sub-title="Editors' Picks of Posts List" @back="() => $router.go(-1)">
        <template slot="tags">
          <a-tag color="blue"> Running </a-tag>
        </template>
        <template slot="extra">
          <a-button key="2"> Other </a-button>
          <a-button key="1" type="primary"> New Pick </a-button>
        </template>
      </a-page-header>

      <div class="content">
        <a-row :gutter="16">
          <a-col :span="8" v-for="pick in picks" :key="pick._id">
            <a-card hoverable class="card" @click="editPick(pick._id)">
              <img slot="cover" alt="example" :src="pick.featured_image" />
              <!-- <template slot="actions" class="ant-card-actions">
                <a-icon key="setting" type="setting" @click="editPick(pick._id)" />
                <a-icon key="edit" type="edit" @click="editPick(pick._id)" />
                <a-icon key="ellipsis" type="ellipsis" @click="editPick(pick._id)" />
              </template> -->
              <a-card-meta :title="pick.name">
                <!-- <a-avatar slot="avatar" icon="star" /> -->
                <template slot="description">
                  <p class="description">{{ pick.description }}</p>
                  <span class="badge badge-success">UPDATE: {{ pick.updated_at | moment('lll') }}</span>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'

export default {
  async beforeRouteEnter(to, from, next) {
    await store.dispatch('content/fetchPicks')
    next()
  },
  methods: {
    editPick(id) {
      router.push({ name: 'pick-detail', params: { id } })
    },
  },
  computed: {
    picks: () => store.getters['content/picks'],
  },
}
</script>

<style lang="scss" scoped>
.postspicks {
  .page {
    .content {
      .card {
        // border-radius: 6px;
      }
    }
  }
}
</style>
