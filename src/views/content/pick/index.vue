<template>
  <div class="view content pick-detail">
    <div class="page">
      <div v-if="loading || posts_loading" class="card loading">
        <div v-for="i in 4" :key="i" class="line">
          <a-skeleton avatar :paragraph="{ rows: 3 }" active />
        </div>
      </div>
      <div v-else>
        <div class="font-size-12 mb-3 bg-gray-2 rounded p-2">
          <a-page-header :title="pick.name" sub-title="(Ediors' Picks)" @back="gotBack">
            <template slot="tags">
              <a-tag color="blue"> {{ pick._id }} </a-tag>
            </template>
            <template slot="extra">
              <a-button key="2" type="dash" @click="onClickReload"> Reload </a-button>
              <a-button key="1" type="primary" @click="onClickUpdate"> Update </a-button>
            </template>
            {{ pick.description }}
            <br />
            <strong style="float: right"><h5>Edit Picks (Drag between two list to update the section)</h5> </strong>
          </a-page-header>
        </div>

        <div class="content">
          <div class="drag-list-wrapper">
            <drag-posts-list
              :source="posts"
              :target="picked"
              source-title="All Posts Source List"
              target-title="Target Picks List"
              @target-updated="onUpdate"
            >
            </drag-posts-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { updatePick } from '@/services/content'
import DragPostsList from '@/components/TPM/DragPostsList'
import store from '@/store'

export default {
  async beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      await store.dispatch('content/init', to.params.id)
      next()
    }
  },
  components: {
    DragPostsList,
  },
  data() {
    return {
      loading: false,
      pick: null,
      picked: [],
    }
  },
  computed: {
    posts_loading: () => store.getters['cms/loading'],
    posts: {
      get() {
        return store.getters['cms/pick_posts']
      },
      set(posts) {
        store.dispatch('cms/pick_posts', posts)
      },
    },
  },
  methods: {
    init() {
      this.loading = true
      this.pick = store.getters['content/pick']
      this.fetchPicked()
      setTimeout(() => {
        this.removeDuplicates()
      }, 3000)
    },
    abspath: (relpath) => `https://cms.thepostmillennial.com${relpath}`,
    gotBack() {
      this.$router.go(-1)
    },
    onClickUpdate() {
      this.$message.success(`${this.pick.name} updated successfully`)
    },
    onClickReload() {
      this.init()
    },
    onUpdate(picks) {
      if (picks && picks.length > 0) {
        this.pick.picks = picks
        updatePick(this.pick)
          .then((updated_pick) => {
            this.pick = updated_pick
            this.fetchPicked()
            this.$message.success(`${updated_pick.name} updated successfully`)
          })
          .catch((err) => {
            if (err) console.error(err)
          })
      }
    },
    convert(post) {
      return {
        id: post.id,
        custom_excerpt: post.custom_excerpt,
        feature_image: this.abspath(post.feature_image),
        primary_author: {
          name: post.author,
        },
        primary_tag: {
          name: post.tag,
        },
        published_at: post.published_at,
        slug: post.slug,
        title: post.title,
        url: `/${post.slug}`,
        sort_order: post.sort_order | undefined,
      }
    },
    fetchPicked() {
      axios
        .get(`https://core.thepostmillennial.com/api/v0/public/content/pick/post/${this.pick._id}`)
        .then((res) => {
          if (res.data && Array.isArray(res.data)) {
            this.picked = res.data.sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1)).map(this.convert)
            this.removeDuplicates()
            this.loading = false
          }
        })
        .catch((err) => {
          if (err) console.error(err)
        })
    },
    removeDuplicates() {
      if (this.posts && this.picked) {
        this.posts = this.posts.filter((post) => !this.picked.find((p) => p.id === post.id))
      }
    },
  },
  async created() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.page {
  .loading {
    padding: 1rem;
    .line {
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
