<template>
  <div class="view system users">
    <div class="page">
      <div class="header">
        <h2>System Users Management</h2>
      </div>
      <div class="content">
        <a-table :columns="columns" :dataSource="users" :rowKey="(record, index) => record._id" :customRow="rowClick">
          <span slot="avatar" slot-scope="user">
            <a-avatar shape="square" :size="28" :src="user.avatar" />
          </span>
        </a-table>
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
          // dataIndex: 'avatar',
          key: 'avatar',
          scopedSlots: { customRender: 'avatar' },
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Display Name',
          dataIndex: 'display_name',
          key: 'display_name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
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

<style lang="scss" scoped></style>
