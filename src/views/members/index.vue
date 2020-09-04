<template>
  <div class="view system members">
    <div class="page">
      <div class="header">
        <h2>Members Management</h2>
      </div>
      <div class="content">
        <div class="card">
          <div class="card-header card-header-flex">
            <div class="d-flex flex-column justify-content-center mr-auto">
              <h5 class="mb-0">
                Members List
                <span :key="$store.getters['members/meta'].total" class="animated fadeIn"
                  >({{ $store.getters['members/meta'].total }})</span
                >
              </h5>
            </div>
            <div class="d-flex flex-column justify-content-center">
              <a class="btn btn-primary" href="javascript: void(0);">New Member</a>
            </div>
          </div>
          <div class="card-body">
            <a-table
              size="small"
              :loading="$store.getters['members/loading']"
              :columns="columns"
              :dataSource="members"
              :rowKey="(record, index) => record._id"
              :customRow="rowClick"
              :scroll="{ x: 1000, y: '100%' }"
              :pagination="pagination"
              @change="change"
            >
              <span slot="avatar" slot-scope="member">
                <a-avatar shape="square" :size="28" :src="member.avatar_url" icon="user" />
              </span>

              <span slot="status" slot-scope="member">
                <a-tag class="status" :class="member.systems.status"> {{ member.systems.status }} </a-tag>
              </span>

              <span slot="membership" slot-scope="member">
                <span class="dot" :class="{ active: member.membership ? member.membership.activated : false }"></span>
              </span>

              <span slot="created_at" slot-scope="created_at">
                <span> {{ created_at | moment('lll') }} </span>
              </span>
              >
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'

export default {
  async beforeRouteEnter(to, from, next) {
    await store.dispatch('members/fetchMembers')
    next()
  },
  data() {
    return {
      columns: [
        {
          title: 'Avatar',
          key: 'avatar',
          width: '60px',
          align: 'center',
          scopedSlots: { customRender: 'avatar' },
          fixed: 'left',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          width: '220px',
          fixed: 'left',
          sorter: (a, b) => {
            return a.username.localeCompare(b.username)
          },
        },
        {
          title: 'Status',
          key: 'systems.status',
          width: '80px',
          align: 'center',
          filters: [
            {
              text: 'Pending',
              value: 'pending',
            },
            {
              text: 'Active',
              value: 'active',
            },
          ],
          filterMultiple: false,
          onFilter: (status, member) => member.systems.status.indexOf(status) === 0,
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'VIP',
          key: 'membership.activated',
          width: '65px',
          align: 'center',
          filters: [
            {
              text: 'Yes',
              value: 'true',
            },
            {
              text: 'No',
              value: 'false',
            },
          ],
          filterMultiple: false,
          onFilter: (activated, member) => {
            if (member.membership && 'activated' in member.membership) {
              return activated === member.membership.activated ? 'true' : 'false'
            } else {
              return 'false'
            }
          },
          scopedSlots: { customRender: 'membership' },
        },
        {
          title: 'Display Name',
          dataIndex: 'display_name',
          key: 'display_name',
          width: '180px',
          sorter: (a, b) => {
            if (a.display_name && b.display_name) {
              return a.display_name.localeCompare(b.display_name)
            }
            return 0
          },
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: (a, b) => {
            return a.email.localeCompare(b.email)
          },
        },
        {
          title: 'Since',
          dataIndex: 'created_at',
          key: 'created_at',
          sorter: (a, b) => {
            const ta = new Date(a.created_at)
            const tb = new Date(b.created_at)
            return ta === tb ? 0 : ta > tb ? 1 : -1
          },
          defaultSortOrder: 'descend',
          scopedSlots: { customRender: 'created_at' },
        },
      ],
    }
  },
  methods: {
    rowClick: (record) => ({
      on: {
        click: (e) => router.push({ name: 'member-detail', params: { id: record._id } }),
      },
    }),
    change: (pagination, filters, sorter) => {
      store.dispatch('members/setQuery', { pagination, filters, sorter })
    },
  },
  computed: {
    members: () => store.getters['members/members'],
    pagination: () => store.getters['members/pagination'],
  },
  mounted() {
    // console.log(store)
  },
  destroyed() {
    store.dispatch('members/init')
  },
}
</script>

<style lang="scss" scoped>
.system.members {
  .status {
    border: none;
    text-transform: capitalize;
    background: #666;
    color: #fff;
    &.active {
      background: #00b44b;
    }
  }
  .dot {
    display: inline-block;
    height: 0.86rem;
    width: 0.86rem;
    background: #666;
    border-radius: 20px;
    vertical-align: middle;
    position: relative;
    top: -2px;

    &.active {
      background: #00b44b;
    }
  }
}
</style>
