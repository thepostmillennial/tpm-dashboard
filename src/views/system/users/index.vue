<template>
  <div class="view system users">
    <div class="page">
      <div class="header">
        <h2>System Users Management</h2>
      </div>
      <div class="content">
        <div class="card">
          <div class="card-header card-header-flex">
            <div class="d-flex flex-column justify-content-center mr-auto">
              <h5 class="mb-0">System Users List</h5>
            </div>
            <div class="d-flex flex-column justify-content-center">
              <a class="btn btn-primary" href="javascript: void(0);">New User</a>
            </div>
          </div>
          <div class="card-body">
            <a-table
              :columns="columns"
              :dataSource="users"
              :rowKey="(record, index) => record._id"
              :customRow="rowClick"
              :scroll="{ x: 1200, y: '100%' }"
            >
              <span slot="avatar" slot-scope="user">
                <a-avatar shape="square" :size="28" :src="user.avatar" />
              </span>
              <span slot="active" slot-scope="user">
                <span class="dot" :class="{ active: user.active }"></span>
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
    await store.dispatch('users/fetchUsers')
    next()
  },
  data() {
    return {
      columns: [
        {
          title: 'Avatar',
          key: 'avatar',
          width: '80px',
          scopedSlots: { customRender: 'avatar' },
          fixed: 'left',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          width: '120px',
          fixed: 'left',
          sorter: (a, b) => {
            return a.username.localeCompare(b.username)
          },
        },
        {
          title: 'Status',
          key: 'active',
          width: '90px',
          scopedSlots: { customRender: 'active' },
        },
        {
          title: 'Display Name',
          dataIndex: 'display_name',
          key: 'display_name',
          sorter: (a, b) => {
            return a.display_name.localeCompare(b.display_name)
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
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Department',
          dataIndex: 'department',
          key: 'department',
        },
        {
          title: 'Job Title',
          dataIndex: 'job_title',
          key: 'job_title',
        },
      ],
    }
  },
  methods: {
    rowClick: (record) => ({
      on: {
        click: (e) => router.push({ name: 'system-user', params: { username: record.username } }),
      },
    }),
  },
  computed: {
    users: () => store.getters['users/users'],
  },
  mounted() {
    // console.log(store)
  },
}
</script>

<style lang="scss" scoped>
.system.users {
  .dot {
    display: inline-block;
    height: 0.86rem;
    width: 0.86rem;
    background: #ff0000;
    border-radius: 20px;
    margin-left: 0.53rem;
    vertical-align: middle;
    position: relative;
    top: -2px;

    &.active {
      background: #00b44b;
    }
  }
}
</style>
