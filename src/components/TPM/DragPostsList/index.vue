<template>
  <div class="drag-posts-list">
    <div :style="{ width: sourceWidth }" class="sub-list source-list">
      <header>
        <h4>{{ sourceTitle }} ({{ `${keyword.length ? filtered_posts.length + '/' : ''}${source.length}` }})</h4>
        <div class="filter">
          <input type="text" class="search" v-model="keyword" placeholder="Search for the posts with title keywords" />
        </div>
      </header>
      <draggable :set-data="setData" :list="filtered_posts" group="posts" class="drag-area">
        <div v-for="post in filtered_posts" :key="post.id" class="list-item-wrapper">
          <div class="list-item">
            <div class="image-wrapper">
              <img :src="post.feature_image" class="rounded feature-image" :alt="post.title" />
            </div>
            <div class="post-info">
              <span class="title">{{ post.title }}</span>
              <p class="excerpt">{{ post.custom_excerpt }}</p>
              <span class="bottom">
                <small class="author">{{ post.primary_author.name }}</small>
                <a-divider type="vertical" />
                <small style="color: #ff5722"> {{ post.primary_tag.name }}</small>
                <a-divider type="vertical" />
                <small class="published_at">{{ post.published_at | moment('lll') }}</small>
              </span>
            </div>
          </div>
          <div class="list-item-actions">
            <span @click="transferPost(post)">
              <i class="fe fe-arrow-right"></i>
            </span>
          </div>
        </div>
      </draggable>
    </div>
    <div :style="{ width: targetWidth }" class="sub-list target-list">
      <header>
        <h4>{{ targetTitle }} ({{ target.length }})</h4>
      </header>

      <!-- Selected Target Group -->
      <draggable :list="selected_target" @change="onTargetListChanged" group="posts" class="drag-area">
        <!-- <transition-group> -->
        <div v-for="(post, index) in target" :key="post.id" class="list-item-wrapper">
          <div class="list-item">
            <div class="image-wrapper">
              <img :src="post.feature_image" class="rounded feature-image" :alt="post.title" />
              <div class="overly">
                <span class="order">{{ index + 1 }}</span>
              </div>
            </div>

            <div class="post-info">
              <span class="title">{{ post.title }}</span>
              <p class="excerpt">{{ post.custom_excerpt }}</p>
              <span class="bottom">
                <small class="author">{{ post.primary_author.name }}</small>
                <a-divider type="vertical" />
                <small style="color: #ff5722"> {{ post.primary_tag.name }}</small>
                <a-divider type="vertical" />
                <small class="published_at">{{ post.published_at | moment('lll') }}</small>
              </span>
            </div>
          </div>
          <div class="list-item-actions">
            <span class="delete" @click="removePost(post)">
              <i class="fe fe-trash"></i>
            </span>
          </div>
        </div>
        <!-- </transition-group> -->
        <transition name="fade">
          <div class="empty-plceholder" v-if="target.length < 1">
            <span><i class="fe fe-warning"></i>The picks list is still empty, drag post from the left list.</span>
          </div>
        </transition>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DragPostsList',
  components: { draggable },
  props: {
    source: {
      type: Array,
      default() {
        return []
      },
    },
    target: {
      type: Array,
      default() {
        return []
      },
    },
    sourceTitle: {
      type: String,
      default: 'Source List',
    },
    targetTitle: {
      type: String,
      default: 'Target List',
    },
    sourceWidth: {
      type: String,
      default: '48%',
    },
    targetWidth: {
      type: String,
      default: '48%',
    },
  },
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    abspath: (relpath) => `https://cms.thepostmillennial.com${relpath}`,
    posturl: (slug) => `https://thepostmillennial.com/${slug}`,
    isNotInSource(v) {
      return this.source.every((k) => v.id !== k.id)
    },
    isNotInTarget(v) {
      return this.target.every((k) => v.id !== k.id)
    },
    transferPost(post) {
      for (const item of this.source) {
        if (item.id === post.id) {
          const index = this.source.indexOf(item)
          this.source.splice(index, 1)
          break
        }
      }
      if (this.isNotInTarget(post)) {
        this.target.unshift(post)
      }

      this.$emit('target-updated', this.reduced_target)
    },
    pushPost(post) {
      for (const item of this.target) {
        if (item.id === post.id) {
          const index = this.target.indexOf(item)
          this.target.splice(index, 1)
          break
        }
      }
      if (this.isNotInSource(post)) {
        this.source.push(post)
      }
    },
    removePost(post) {
      for (const item of this.target) {
        if (item.id === post.id) {
          const index = this.target.indexOf(item)
          this.target.splice(index, 1)
          break
        }
      }
      if (this.isNotInTarget(post)) {
        this.source.unshift(post)
      }

      this.$emit('target-updated', this.reduced_target)
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    onTargetListChanged(event) {
      this.$emit('target-updated', this.reduced_target)
    },
  },
  computed: {
    reduced_target() {
      return this.target.map((post, order) => {
        return {
          post_id: post.id,
          sort_order: order,
        }
      })
    },
    filtered_posts: {
      get() {
        if (this.keyword && this.keyword.length > 2) {
          return this.source.filter((post) => post.title.search(new RegExp(this.keyword, 'igm')) > 0)
        } else {
          return this.source
        }
      },
      set(data) {
        this.$emit('source', data)
      },
    },
    selected_target: {
      get() {
        return this.target
      },
      set(data) {
        this.$emit('target', data)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.drag-posts-list {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
  .sub-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }

    .filter {
      .search {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #aaa;
        box-shadow: inset 0 2px 10px #ddd;
      }
    }

    .drag-area {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;

      .list-item-wrapper {
        cursor: pointer;
        position: relative;
        font-size: 14px;
        padding: 8px;
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 0 1px 1px rgb(211, 211, 211);
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: flex-end;

        .list-item {
          display: flex;
          flex: 1;

          .image-wrapper {
            position: relative;
            .feature-image {
              border-radius: 4px;
              object-fit: cover;
              width: 160px;
              height: 100%;
              min-height: 120px;
            }
            .overly {
              position: absolute;
              top: 8px;
              left: 16px;
              font-size: 20px;
              font-weight: 800;
              color: #fff;
              text-shadow: 1px 1px 2px #000;
            }
          }

          .post-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 8px;
            .title {
              font-size: 18px;
              font-weight: 800;
              text-transform: capitalize;
            }
            .excerpt {
              padding: 2px 0;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .bottom {
              .tag {
                background: #eee;
                padding: 0 5px;
                border-radius: 3px;
              }
              .author {
                color: rgb(0, 62, 124);
                font-weight: 600;
              }
            }
          }
        }

        .list-item-actions {
          span {
            font-size: 20px;
            color: #002f64;
          }

          span.delete {
            font-size: 20px;
            color: red;
          }
        }

        &.sortable-chosen {
          background: #6ab0ff;
        }

        &.sortable-ghost {
          background: #faffcf;
        }
      }
    }
  }
}

.empty-plceholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border: 2px dashed rgb(204, 204, 204);
  border-radius: 4px;
  transition: all 1s;
  color: #aaa;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 1;
}
</style>
